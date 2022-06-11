import 'express-async-error';
import * as requestRepository from '../data/request.js';
import * as staffRepository from '../data/staff.js';
import * as productRepository from '../data/product.js';
import * as requestListRepository from '../data/request_list.js';

export async function add(req, res) {
  const loginStaff = await staffRepository.findByStaffNo(req.staff_no);
  if (loginStaff.POSITION_CD !== '01') {
    return res.status(401).json({ message: '권환이 없습니다.' });
  }
  const items = req.body.items;

  // 발주하려는 제품 번호가 넘어오지 않았을 경우
  if (items.length <= 0) {
    return res
      .status(401)
      .json({ message: '발주하려고 하는 물품을 등록하세요.' });
  }

  // 발주하려고 하는 아이템이 제품에 없다면
  for (let i = 0; i < items.length; i++) {
    const item = productRepository.getProduct(items[i].product_no);
    if (!item) {
      return res.status(404).json({
        message: `${items[i].product_no}에 해당하는 제품이 없습니다.`,
      });
    }
  }

  // 발주를 생성한다
  const request_no = await requestRepository.createRequest(req.staff_no);

  // 해당 아이템들을 생성된
  // 아이템의 가격을 가져온다.
  // 생성된 발주번호와 아이템번호를 이용해 발주 리스트를 만든다.
  for (let i = 0; i < items.length; i++) {
    const won = await productRepository.getWonByProductNo(items[i].product_no);
    const requestList = {
      request_cnt: items[i].request_cnt,
      request_won: won.PRODUCT_WON * items[i].request_cnt,
      request_no,
      product_no: items[i].product_no,
    };
    console.log(requestList);
    await requestListRepository.createRequestList(requestList);
  }

  res.status(200).json();
}

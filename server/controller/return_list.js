import 'express-async-error';
import * as returnRepository from '../data/return.js';
import * as staffRepository from '../data/staff.js';
import * as productRepository from '../data/product.js';
import * as itemRepository from '../data/item.js';
import * as returnListRepository from '../data/return_list.js';

export async function add(req, res) {
  const loginStaff = await staffRepository.findByStaffNo(req.staff_no);
  if (loginStaff.POSITION_CD !== '01') {
    return res.status(401).json({ message: '권환이 없습니다.' });
  }
  const items = req.body.items;

  if (items.length <= 0) {
    return res
      .status(401)
      .json({ message: '반품하려고 하는 물품을 등록하세요.' });
  }

  // 반품하려고 하는 아이템이 제품에 없다면
  for (let i = 0; i < items.length; i++) {
    const item = await itemRepository.getItemByNo(items[i].item_no);
    if (!item) {
      return res.status(404).json({
        message: `${items[i].item_no}에 해당하는 물품이 없습니다.`,
      });
    }
  }

  // 반품 목록에 해당 아이템이 존재한다면 거절
  for (let i = 0; i < items.length; i++) {
    const returnList = await returnListRepository.getReturnList(
      items[i].item_no
    );
    console.log(returnList);
    if (returnList) {
      return res.status(401).json({
        message: `${items[i].item_no}에 해당하는 물품은 이미 반품되었습니다.`,
      });
    }
  }

  // 반품을 생성한다.
  const return_no = await returnRepository.createReturn(req.staff_no);

  // 해당 아이템들을 생성된
  // 생성된 반품번호와 아이템번호를 이용해 반품 리스트를 만든다.
  for (let i = 0; i < items.length; i++) {
    const product_no = await itemRepository.getProductNo(items[i].item_no);
    const won = await productRepository.getWonByProductNo(product_no);
    const returnList = {
      return_won: won.PRODUCT_WON,
      return_reason: items[i].return_reason,
      return_no,
      item_no: items[i].item_no,
    };
    await returnListRepository.createReturnList(returnList);
  }

  res.status(200).json();
}

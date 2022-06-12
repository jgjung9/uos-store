import 'express-async-error';
import * as saleRepository from '../data/sale.js';
import * as productRepository from '../data/product.js';
import * as saleListRepository from '../data/sale_list.js';
import * as itemRepository from '../data/item.js';

export async function getSale(req, res) {
  const sale_no = req.query.sale_no;
  if (!sale_no) {
    const data = await saleRepository.all();
    return res.status(200).json(data);
  }
  const sale = await saleRepository.findBySaleNo(sale_no);
  if (!sale) {
    res.status(404).json({
      message: `${sale_no}에 해당하는 판매정보가 없습니다.`,
    });
  }
  res.status(200).json(sale);
}

export async function add(req, res) {
  const { sale_no, sale_won, received_won, customer_no, used_mileage, pay_cd } =
    req.body;
  const sale = {
    sale_no: sale_no,
    sale_won: sale_won,
    received_won: received_won,
    customer_no: customer_no,
    used_mileage: used_mileage,
    pay_cd: pay_cd,
  };
  const { items } = req.body;
  // 아이템이 목록에 존재하는지 확인
  // 만약 판매된 물품이 있는경우 거절
  for (let i = 0; i < items.length; i++) {
    const item = await itemRepository.getItemByNo(items[i]);
    console.log(item);
    if (!item) {
      res
        .status(404)
        .json({ message: `${items[i]} 해당하는 물품이 없습니다.` });
      return;
    }
    const soldItem = await saleListRepository.getSaleListByItemNo(items[i]);
    console.log(soldItem);
    if (soldItem) {
      res
        .status(404)
        .json({ message: `${items[i]} 해당하는 물품은 이미 판매되었습니다.` });
      return;
    }
  }

  // 판매진행
  // 판매를 생성하고 정보를 등록한다.
  saleRepository.createSale(sale);
  // 판매리스트에 등록한다.
  saleListRepository.createSaleList(sale_no, items);
  // 재고를 업데이트 한다.
  productRepository.minusStockUpdate(items);
  res.status(201).json(sale);
}

export async function updateSale(req, res) {
  const sale_no = req.query.sale_noo;
  const sale = await saleRepository.findBySaleNo(sale_no);
  if (!sale) {
    res.status(404).json({
      message: `${sale_no}에 해당하는 판매정보가 없습니다.`,
    });
  }
}

export async function deleteSale(req, res) {
  const sale_no = req.params.sale_no;
  const sale = await saleRepository.findBySaleNo(sale_no);
  if (!sale) {
    return res
      .status(404)
      .json({ message: `${sale_no}에 해당하는 판매정보가 없습니다.` });
  }

  // 판매취소 절차 판매목록에서 재고량 업데이트 -> 판매삭제
  // 판매목록에서 아이템들을 삭제 재고량 업데이트는 아이템 삭제와 동시에 진행
  await saleListRepository.deleteSaleListByNo(sale_no);
  // 판매삭제
  await saleRepository.deleteBySaleNo(sale_no);
  res.status(204).json();
}

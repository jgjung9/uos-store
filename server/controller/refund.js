import 'express-async-error';
import * as refundRepository from '../data/refund.js';
import * as saleListRepository from '../data/sale_list.js';
import * as saleRepository from '../data/sale.js';
import * as productRepository from '../data/product.js';
import * as itemRepository from '../data/item.js';

export async function getAll(req, res) {
  const refunds = await refundRepository.all();
  if (!refunds) {
    return res.status(404).json({ message: '환불정보가 없습니다.' });
  }
  res.status(200).json(refunds);
}

export async function getRefundByItemNo(req, res) {
  const item_no = req.params.item_no;
  console.log(item_no);
  const refund = await refundRepository.getRefundByItemNo(item_no);
  if (!refund) {
    return res.status(404).json({
      message: `${item_no} 해당하는 환불정보가 없습니다.`,
    });
  }
  res.status(200).json(refund);
}

export async function add(req, res) {
  const { item_no, refund_reason, item_status } = req.body;
  const refund = {
    item_no,
    refund_reason,
    item_status,
  };
  // 만약 판매된 아이템이 아닐경우 404
  const soldItem = await saleListRepository.getSaleListByItemNo(item_no);
  if (!soldItem) {
    return res
      .status(404)
      .json({ message: `${item_no}에 해당 하는 물품은 판매된 적이 없습니다.` });
  }

  const item = await itemRepository.getItemByNo(item_no);
  // // 판매목록에서 해당 아이템 삭제 진행 재고 업데이트
  // 삭제 진행
  saleListRepository.deleteSaleListByItemNo(item_no);
  // 재고 업데이트
  // productRepository.plusStockUpdate([item_no]);

  // 판매정보에서 해당 아이템의 금액만큼 가격 차감진행
  const won = await productRepository.getWonByProductNo(item.PRODUCT_NO);
  await saleRepository.minusUpdateWon(soldItem.SALE_NO, won.PRODUCT_WON);

  refundRepository.addRefund(refund);
  res.status(200).json();
}

export async function deleteByItemNo(req, res) {
  const item_no = req.params.item_no;
  const refund = refundRepository.getRefundByItemNo(item_no);
  if (!refund) {
    res.status(404).json({
      messga: `${item_no}에 해당하는 환불정보가 없습니다.`,
    });
  }
  await refundRepository.deleteRefund(refund);
  res.status(204).json({ message: '삭제되었습니다.' });
}

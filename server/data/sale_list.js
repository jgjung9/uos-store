import { db, format } from '../db/database.js';
import * as productRepository from './product.js';

export async function getSaleListByItemNo(item_no) {
  return await db
    .execute(`SELECT * FROM SALE_LIST WHERE ITEM_NO=(:1)`, [item_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0]);
}

export async function createSaleList(sale_no, items) {
  for (let i = 0; i < items.length; i++) {
    await db.execute(
      `INSERT INTO SALE_LIST VALUES((:1),(:2))`,
      [sale_no, items[i]],
      { outFormat: format }
    );
  }
}

export async function deleteSaleListByItemNo(item_no) {
  await db
    .execute(`DELETE FROM SALE_LIST WHERE ITEM_NO=(:1)`, [item_no], {
      outFormat: format,
    })
    .then(console.log);
}

// 판매번호에 해당하는 판매목록 삭제 및 재고량 업데이트
export async function deleteSaleListByNo(sale_no) {
  const items = await db
    .execute(`SELECT ITEM_NO FROM SALE_LIST WHERE SALE_NO=(:1)`, [sale_no], {
      outFormat: format,
    })
    .then((result) => result.rows);
  const items_no = [];
  items.forEach((item) => {
    items_no.push(item.ITEM_NO);
  });

  // 재고량 업데이트
  await productRepository.plusStockUpdate(items_no);

  // 판매목록 삭제
  await deleteSaleList(sale_no);
}

async function deleteSaleList(sale_no) {
  return await db
    .execute(`DELETE FROM SALE_LIST WHERE SALE_NO=(:1)`, [sale_no], {
      outFormat: format,
    })
    .then(console.log)
    .catch(console.error);
}

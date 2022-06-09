import { db, format } from '../db/database.js';

export async function minusStockUpdate(items) {
  for (let i = 0; i < items.length; i++) {
    const product_no = await db
      .execute(`SELECT PRODUCT_NO FROM ITEM WHERE ITEM_NO=(:1)`, [items[i]], {
        outFormat: format,
      })
      .then((result) => result.rows[0]);
    const { STOCK_CNT } = await db
      .execute(
        `SELECT STOCK_CNT FROM PRODUCT WHERE PRODUCT_NO=(:1)`,
        [product_no.PRODUCT_NO],
        { outFormat: format }
      )
      .then((result) => result.rows[0]);
    console.log(STOCK_CNT);
    console.log(product_no.PRODUCT_NO);
    await db
      .execute(
        `UPDATE PRODUCT SET STOCK_CNT=(:1) WHERE PRODUCT_NO=(:2)`,
        [STOCK_CNT - 1, product_no.PRODUCT_NO],
        { outFormat: format }
      )
      .then(console.log);
  }
}

export async function plusStockUpdate(items) {
  for (let i = 0; i < items.length; i++) {
    const product_no = await db
      .execute(`SELECT PRODUCT_NO FROM ITEM WHERE ITEM_NO=(:1)`, [items[i]], {
        outFormat: format,
      })
      .then((result) => result.rows[0]);
    const { STOCK_CNT } = await db
      .execute(
        `SELECT STOCK_CNT FROM PRODUCT WHERE PRODUCT_NO=(:1)`,
        [product_no.PRODUCT_NO],
        { outFormat: format }
      )
      .then((result) => result.rows[0]);
    console.log(STOCK_CNT);
    console.log(product_no.PRODUCT_NO);
    await db
      .execute(
        `UPDATE PRODUCT SET STOCK_CNT=(:1) WHERE PRODUCT_NO=(:2)`,
        [STOCK_CNT + 1, product_no.PRODUCT_NO],
        { outFormat: format }
      )
      .then(console.log);
  }
}

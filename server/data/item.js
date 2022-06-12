import { db, format } from '../db/database.js';

export async function getItemByNo(item_no) {
  return await db
    .execute(`SELECT * FROM ITEM WHERE ITEM_NO=(:1)`, [item_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0])
    .catch(console.error);
}

export async function getProductNo(itemNo) {
  const product_no = await db
    .execute(`SELECT PRODUCT_NO FROM ITEM WHERE ITEM_NO=(:1)`, [itemNo], {
      outFormat: format,
    })
    .then((result) => result.rows[0])
    .catch(console.error);
  return product_no.PRODUCT_NO;
}

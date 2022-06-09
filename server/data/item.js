import { db, format } from '../db/database.js';

export async function getItemByNo(item_no) {
  return await db
    .execute(`SELECT * FROM ITEM WHERE ITEM_NO=(:1)`, [item_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0]);
}

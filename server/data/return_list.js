import { db, format } from '../db/database.js';

export async function createReturnList(returnList) {
  const { return_won, return_reason, return_no, item_no } = returnList;

  await db
    .execute(
      `INSERT INTO RETURN_LIST VALUES((:1),(:2),(:3),(:4))`,
      [return_won, return_reason, return_no, item_no],
      { outFormat: format }
    )
    .then(console.log);
}

export async function getReturnList(item_no) {
  return await db
    .execute(`SELECT * FROM RETURN_LIST WHERE ITEM_NO=(:1)`, [item_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0]);
}

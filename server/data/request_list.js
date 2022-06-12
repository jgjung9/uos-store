import { db, format } from '../db/database.js';

export async function createRequestList(requestList) {
  const { request_cnt, request_won, request_no, product_no } = requestList;

  await db
    .execute(
      `INSERT INTO REQUEST_LIST VALUES((:1),(:2),(:3),(:4))`,
      [request_cnt, request_won, request_no, product_no],
      { outFormat: format }
    )
    .then(console.log)
    .catch(console.error);
}

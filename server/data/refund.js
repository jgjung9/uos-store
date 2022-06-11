import { db, format } from '../db/database.js';

export async function all() {
  return await db
    .execute(`SELECT * FROM REFUND`, {}, { outFormat: format })
    .then((result) => result.rows);
}

export async function getRefundByItemNo(item_no) {
  return db
    .execute(`SELECT * FROM REFUND WHERE ITEM_NO=(:1)`, [item_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0]);
}

export async function addRefund(refund) {
  const { item_no, refund_reason, item_status } = refund;
  console.log(refund);
  return await db
    .execute(
      `INSERT INTO REFUND (item_no, refund_reason, item_status) values((:1),(:2),(:3))`,
      [item_no, refund_reason, item_status],
      { outFormat: format }
    )
    .then(console.log);
}

export async function deleteRefund(refund) {
  const item_no = refund.item_no;
  return db
    .execute(`DELETE FROM REFUND WHERE item_no=(:1)`, [item_no], {
      outFormat: format,
    })
    .then(console.log);
}

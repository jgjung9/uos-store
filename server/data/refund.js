import { db } from '../db/database.js';

export async function all() {
  return db
    .execute(`SELET * FROM REFUND`)
    .then((result) => console.log(result));
}

export async function getRefundByItemNo(item_no) {
  return db.execute(`SELET * FROM REFUND WHERE item_no=?`, item_no);
}

export async function addRefund(item) {
  const { item_no, refund_status, item_status } = item;
  return db
    .execute(
      `INSERT INTO REFUND (item_no, refund_status, item_status) values((:1),(:2),(:3))`,
      [item_no, refund_status, item_status]
    )
    .then((result) => console.log(result));
}

export async function deleteRefund(refund) {
  const item_no = refund.item_no;
  return db
    .execute(`DELETE FROM REFUND WHERE item_no=?`, item_no)
    .then((result) => console.log(result));
}

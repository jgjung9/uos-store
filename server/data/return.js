import { db, format } from '../db/database.js';

let cnt = 0;

export async function createReturn(staffNo) {
  const date = new Date();
  const return_no =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString() +
    date.getDate() +
    (cnt++).toString();
  const return_dt =
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1).toString() +
    '-' +
    date.getDate();
  const staff_no = staffNo;
  const store_no = '12345671';
  console.log(return_no, return_dt, staff_no, store_no);
  await db.execute(
    `INSERT INTO RETURN VALUES((:1),(:2),(:3),(:4))`,
    [return_no, return_dt, staff_no, store_no],
    { outFormat: format }
  );
  return return_no;
}

import { db, format } from '../db/database.js';

export async function createRequest(staffNo) {
  const date = new Date();
  const request_no = date.getTime().toString().slice(5);
  const request_dt =
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1).toString() +
    '-' +
    date.getDate();
  const staff_no = staffNo;
  const store_no = '12345671';
  console.log(request_no, request_dt, staff_no, store_no);
  await db
    .execute(
      `INSERT INTO REQUEST VALUES((:1),(:2),(:3),(:4))`,
      [request_no, request_dt, staff_no, store_no],
      { outFormat: format }
    )
    .catch(console.error);
  return request_no;
}

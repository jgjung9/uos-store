import { db, format } from '../db/database.js';

export async function findByStaffNo(staff_no) {
  return db
    .execute(`SELECT * FROM STAFF WHERE STAFF_NO=(:1)`, [staff_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0])
    .catch(console.error);
}

export async function getAll() {
  return db
    .execute(`SELECT * FROM STAFF`, {}, { outFormat: format })
    .then((result) => result.rows)
    .catch(console.error);
}

export async function createStaff(staff) {
  const sql = `INSERT INTO STAFF 
    (staff_no, password, staff_nm, position_cd, work_start_time, work_end_time, salary, discharge_date, account_no) 
    values((:1), (:2), (:3), (:4), NULL, NULL, NULL, NULL, NULL)`;
  const { staff_no, password, staff_nm, position_cd } = staff;
  console.log(password);
  return db.execute(sql, [staff_no, password, staff_nm, position_cd]);
}

export async function dischargeStaff(staff_no) {
  const date = new Date();
  const dischargeDate =
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1).toString() +
    '-' +
    date.getDate().toString();
  console.log(dischargeDate);
  return db
    .execute(
      `UPDATE STAFF SET DISCHARGE_DATE=(:1) WHERE STAFF_NO=(:2)`,
      [dischargeDate, staff_no],
      { outFormat: format }
    )
    .then(console.log);
}

import { db, format } from '../db/database.js';

export async function all() {
  return await db
    .execute(`SELECT * FROM SALE`, {}, { outFormat: format })
    .then((result) => result.rows)
    .catch(console.error);
}

export async function findBySaleNo(sale_no) {
  return await db
    .execute(`SELECT * FROM SALE WHERE SALE_NO=(:1)`, [sale_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0])
    .catch(console.error);
}

export async function createSale(sale) {
  const sql = `INSERT INTO SALE VALUES((:1),(:2),(:3),(:4),(:5),(:6),(:7))`;

  const date = new Date();
  const sale_dt =
    date.getFullYear().toString() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate().toString();
  const { sale_no, sale_won, received_won, customer_no, used_mileage, pay_cd } =
    sale;

  await db
    .execute(
      sql,
      [
        sale_no,
        sale_dt,
        +sale_won,
        +received_won,
        customer_no,
        +used_mileage,
        pay_cd,
      ],
      { outFormat: format }
    )
    .then(console.log)
    .catch(console.error);
}

export async function deleteBySaleNo(sale_no) {
  return await db
    .execute(`DELETE FROM SALE WHERE SALE_NO=(:1)`, [sale_no], {
      outFormat: format,
    })
    .then(console.log)
    .catch(console.error);
}

export async function updateSale(sale) {
  const { sale_no, sale_won, received_won, cutomer_no, used_mileage, pay_cd } =
    sale;
  return db
    .execute(
      `UPDATE SALE 
    SALE_WON=(:1) RECEIVED_WON=(:2) CUSTOMER_NO=(:3) USED_MILEAGE=(:4) PAY_CD=(:5) 
    WHERE SALE_NO=(:6)`,
      [sale_won, received_won, cutomer_no, used_mileage, pay_cd, sale_no],
      { outFormat: format }
    )
    .then(console.log)
    .catch(console.error);
}

export async function minusUpdateWon(sale_no, won) {
  const sale_won = await db
    .execute(`SELECT SALE_WON FROM SALE WHERE SALE_NO=(:1)`, [sale_no], {
      outFormat: format,
    })
    .then((result) => result.rows[0]);
  return db
    .execute(
      `UPDATE SALE SET SALE_WON=(:1) WHERE SALE_NO=(:2)`,
      [sale_won.SALE_WON - won, sale_no],
      { outFormat: format }
    )
    .then(console.log)
    .catch(console.error);
}

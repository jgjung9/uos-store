import { db } from '../db/database.js';

export async function all() {
    return db
        .execute(`SELECT * FROM SALE`)
        .then((result) => console.log(result))
        .catch(console.error);
}

export async function findBySaleNo(sale_no) {
    return db
        .execute(`SELECT * FROM SALE WHERE SALE_NO=?`, sale_no)
        .then((result) => console.log(result));
}

export async function createSale(sale) {
    const sql = `INSERT INTO SALE (staff_no, sale_won, received_won, customer_no, used_mileage, pay_cd) value(?,?,?,?,?,?)`;
    const {
        sale_no,
        sale_won,
        received_won,
        customer_no,
        used_mileage,
        pay_cd,
    } = sale;
    return db
        .execute(sql, [
            sale_no,
            sale_won,
            received_won,
            customer_no,
            used_mileage,
            pay_cd,
        ])
        .then((result) => console.log(result));
}

export async function deleteBySaleNo(sale_no) {
    return db
        .execute(`DELETE FROM SALE WHERE sale_no=?`, sale_no)
        .then((result) => console.log(result));
}

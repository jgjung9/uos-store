import 'express-async-error';
import * as saleRepository from '../data/sale.js';

export async function getAll(req, res) {
    const data = await saleRepository.all();
    res.status(200).json(data);
}

export async function add(req, res) {
    const {
        sale_no,
        sale_won,
        received_won,
        customer_no,
        used_mileage,
        pay_cd,
    } = req.body;
    const sale = {
        sale_no: sale_no,
        sale_won: sale_won,
        received_won: received_won,
        customer_no: customer_no,
        used_mileage: used_mileage,
        pay_cd: pay_cd,
    };
    saleRepository.createSale(sale);
    res.status(201).json(sale);
}

export async function getSale(req, res) {
    const sale_no = req.query.sale_no;
    const sale = await saleRepository.findBySaleNo(sale_no);
    if (!sale) {
        res.status(404).json({
            message: `${sale_no}에 해당하는 판매정보가 없습니다.`,
        });
    } else {
        res.status(200).json(sale);
    }
}

export async function deleteSale(req, res) {
    const sale_no = req.params.sale_no;
    const sale = await saleRepository.findBySaleNo(sale_no);
    if (!sale) {
        return res
            .status(404)
            .json({ message: `${sale_no}에 해당하는 판매정보가 없습니다.` });
    }
    await saleRepository.deleteBySaleNo(sale_no);
    res.status(204);
}

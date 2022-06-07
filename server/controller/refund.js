import 'express-async-error';
import * as refundRepository from '../data/refund.js';

export async function getAll(req, res) {
    const refunds = Promise.all();
}

export async function getByItemNo(req, res) {}

export async function add(req, res) {}

export async function remove(req, res) {
    const item_no = req.params.item_no;
    const refund = refundRepository.getRefundByItemNo(item_no);
    if (!refund) {
        res.status(404).json({
            messga: `${item_no}에 해당하는 환불정보가 없습니다.`,
        });
    }
    await refundRepository.deleteRefund(refund);
    res.status(204).json({ message: '삭제되었습니다.' });
}

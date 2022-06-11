import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/staff.js';
import * as refundController from '../controller/refund.js';

const router = express.Router();

// validate 작성해야 함

// GET /refund 모든 환불 정보를 조회
router.get('/', isAuth, refundController.getAll);

// GET /refund/:item_no 아이템 번호에 해당하는 환불정보를 가져옵니다.
router.get('/:item_no', isAuth, refundController.getRefundByItemNo);

// POST /refund/add 환불 정보를 추가합니다.
router.post('/add', isAuth, refundController.add);

// DELETE /refund/:item_no 아이템 번호에 해당하는 환불정보를 삭제합니다.
router.delete('/:item_no', isAuth, refundController.deleteByItemNo);

export default router;

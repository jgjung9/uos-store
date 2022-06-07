import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as saleController from '../controller/sale.js';
import { isAuth } from '../middleware/staff.js';

const router = express.Router();

// validate 작성해야 함

// GET /sale 모든 판매정보를 조회한다.
router.get('/', isAuth, saleController.getAll);

// POST /sale/add 판매를 추가한다.
router.post('/add', isAuth, saleController.add);

// GET /sale?sale_no=:sale_no 쿼리에 입력된 판매번호에 해당하는 정보를 조회한다.
router.get('/', isAuth, saleController.getSale);

// DELETE /sale/:sale_no 파라미터로 넘어온 판매번호에 해당하는 정보를 삭제한다.
router.delete('/:sale_no', saleController.deleteSale);

export default router;

import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/staff.js';
import * as returnController from '../controller/return.js';

const router = express.Router();

// GET /return or /return?return_no=:return_no
router.get('/return');
// POST /return/add

// 구현 보류
// DELETE /return/:return_no

export default router;

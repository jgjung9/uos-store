import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/staff.js';
import * as requestController from '../controller/request_list.js';

const router = express.Router();

// POST /request_list/add
router.post('/add', isAuth, requestController.add);

export default router;

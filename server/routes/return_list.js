import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/staff.js';
import * as returnListController from '../controller/return_list.js';

const router = express.Router();

// POST /return/add
router.post('/add', isAuth, returnListController.add);

export default router;

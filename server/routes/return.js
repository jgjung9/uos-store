import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/staff.js';
import * as returnController from '../controller/return.js';

const router = express.Router();

// GET /return/:date
router.get('/:date', isAuth, returnController.getReturnByDate);

export default router;

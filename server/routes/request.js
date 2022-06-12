import express from 'express';
import 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/staff.js';
import * as requestController from '../controller/request.js';

const router = express.Router();

// GET /request/:date
router.get('/:date', isAuth, requestController.getRequestByDate);

export default router;

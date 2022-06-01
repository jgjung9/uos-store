import jwt from 'jsonwebtoken';
import * as staffRepository from '../data/staff.js';
import { config } from '../config.js';

const AUTH_ERROR = { message: 'Authentication Error ' };

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        const staff = await staffRepository.findByStaffNo(decoded.staff_no);
        if (!staff) {
            return res.status(401).json(AUTH_ERROR);
        }
        req.staff_no = staff.staff_no;
        next();
    });
};

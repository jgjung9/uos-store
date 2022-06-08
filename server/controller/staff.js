import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-error';
import { config } from '../config.js';
import * as staffRepository from '../data/staff.js';

export async function signup(req, res) {
  const { staff_no, password, staff_nm, position_cd } = req.body;
  const found = await staffRepository.findByStaffNo(staff_no);
  if (found) {
    return res.status(409).json({ message: `${staff_no} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

  // staff_no 반환된다.
  const staff = await staffRepository.createStaff({
    staff_no,
    password: hashed,
    staff_nm,
    position_cd,
  });
  const token = createJwtToken(staff);
  res.status(201).json({ token, staff_no });
}

export async function login(req, res) {
  const { staff_no, password } = req.body;
  const staff = await staffRepository.findByStaffNo(staff_no);
  if (!staff) {
    return res.status(401).json({ message: '없는 직원입니다.' });
  }
  const isValidPassword = await bcrypt.compare(password, staff.PASSWORD);
  if (!isValidPassword) {
    return res.status(401).json({ message: '비밀번호를 틀렸습니다.' });
  }
  const token = createJwtToken(staff_no);
  res.status(200).json({ token, staff_no });
}

function createJwtToken(staff_no) {
  return jwt.sign({ staff_no }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res) {
  const staff = await staffRepository.findByStaffNo(req.staff_no);

  if (!staff) {
    return res.status(404).json({ message: '없는 직원입니다.' });
  }
  res.status(200).json(staff);
}

export async function all(req, res) {
  const staff = await staffRepository.findByStaffNo(req.staff_no);
  if (staff.POSITION_CD !== '01') {
    return res.status(401).json({ message: '권한이 없습니다.' });
  }
  const data = await staffRepository.getAll();
  res.status(200).json(data);
}

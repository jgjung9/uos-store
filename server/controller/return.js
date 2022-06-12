import 'express-async-error';
import * as returnRepository from '../data/return.js';

export async function getReturnByDate(req, res) {
  const date = req.params.date;
  const returns = await returnRepository.getReturnByDate(date);
  if (!returns) {
    return res
      .status(404)
      .json({ message: `${date} 날짜에 해당하는 반품 정보가 없습니다.` });
  }
  res.status(200).json(returns);
}

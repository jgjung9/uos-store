import 'express-async-error';
import * as requestRepository from '../data/request.js';

export async function getRequestByDate(req, res) {
  const date = req.params.date;
  const requests = await requestRepository.getRequestByDate(date);
  if (!requests) {
    return res
      .status(404)
      .json({ message: `${date} 날짜에 해당하는 발주 정보가 없습니다.` });
  }
  res.status(200).json(requests);
}

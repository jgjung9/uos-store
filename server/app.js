import express from 'express';
import 'express-async-error';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from './config.js';
import staffRouter from './routes/staff.js';
import saleRouter from './routes/sale.js';
// import refundRouter from './routes/refund.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/staff', staffRouter);
app.use('/sale', saleRouter);
// app.use('/refund', refundRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(config.host.port);

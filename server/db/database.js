import oracledb from 'oracledb';
import { config } from '../config.js';
oracledb.autoCommit = true;

export const db = await oracledb.getConnection(config.db);
export const format = oracledb.OUT_FORMAT_OBJECT;

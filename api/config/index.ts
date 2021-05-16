import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbuser: process.env.USER,
  dbpassword: process.env.PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME
};
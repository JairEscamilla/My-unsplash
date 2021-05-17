import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbuser: process.env.USER,
  dbpassword: process.env.PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
};
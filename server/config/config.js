require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,

  DB: 'postgres',
  DB_CLIENT: 'postgresql',
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SEEDS_DIRECTORY: process.env.SEEDS_DIRECTORY,
  API_URL: process.env.API_URL,
  timerInterval: 10,
  tokenKey: '1a2b3c4d5e6f7g8h',
  NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
};

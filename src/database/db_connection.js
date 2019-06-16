const { Pool } = require('pg');
require('dotenv').config();
const url = require('url');

let DB_URL;
if (!process.env.DATABASE_URL) {
  DB_URL = process.env.TEST_DB_URL;
  console.log('NOT PROD', DB_URL);
} else {
  DB_URL = process.env.DATABASE_URL;
  console.log('production', DB_URL);
}

if (!DB_URL)
  throw new Error('Environment  variable DB_URL must be set');

const params = url.parse(process.env.DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost'
};

module.exports = new Pool(options);

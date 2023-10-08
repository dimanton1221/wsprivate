require('dotenv').config();
const envFile = `.env.${process.env.NODE_ENV}`;
console.log(`Using ${envFile} file`);
require('dotenv').config({ path: envFile });
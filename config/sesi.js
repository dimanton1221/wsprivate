const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '11',
    database: 'paradito'
};
const sessionStore = new MySQLStore(options);

module.exports = { sessionStore };
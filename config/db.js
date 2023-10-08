const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_URL);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(err => {
        console.error('Error connecting to database: ', err);
    });

module.exports = { sequelize };
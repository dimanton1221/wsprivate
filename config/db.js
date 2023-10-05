const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("mariadb://root:11@localhost:3306/paradito");

sequelize.authenticate()
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(err => {
        console.error('Error connecting to database: ', err);
    });

module.exports = { sequelize };
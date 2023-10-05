const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    // username password 
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tokenws: {
        type: DataTypes.STRING,
        // allowNull: false
        defaultValue: () => uuidv4(),

    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_aplikasi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shot: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    profit_global: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    reset_win: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    settingan:{
        type: DataTypes.STRING,
        defaultValue: ""
    }
});



// User.sync({ alter: true });

module.exports = User;

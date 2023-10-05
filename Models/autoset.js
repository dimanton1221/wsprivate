const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const autoset = sequelize.define('autoset', {
    id:
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_settings:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    input:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reset_win:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reset_lose:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    martilos:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    martiwin:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profit_season:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tradecount:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalrebet:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

// sync 
// autoset.sync({ alter: true })

module.exports = autoset;
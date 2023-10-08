const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = require('./User.js');
const Config = sequelize.define('config', {
    ch1: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ch2: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    shot: {
        type: DataTypes.FLOAT,
        allowNull: false,

    },
    boom: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    delay: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    beta: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    input_global: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    input_season: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    martilos: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    martiwin: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    input_ws: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    input_wl: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ifwin: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ifwinbom: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    iflose: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    iflosboom: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

Config.belongsTo(User);
User.hasOne(Config);


module.exports = Config;
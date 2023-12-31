const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = require('./User.js');
const Config = sequelize.define('config', {
    
    ch1: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    ch2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    shot: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    boom: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    delay: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    beta: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    input_global: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    input_season: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    martilos: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    martiwin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    input_ws: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    input_wl: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    ifwin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    ifwinbom: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    iflose: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
    iflosboom: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.0
    },
});

module.exports = Config;
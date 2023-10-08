const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = require('./User.js');
const Config = sequelize.define('config', {
    test: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "test"
    }
});

Config.belongsTo(User);
User.hasOne(Config);


module.exports = Config;
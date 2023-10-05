const db = require('../config/db.js');
const { DataTypes } = require('sequelize');

const UserMaster = db.sequelize.define('UserMaster', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_aplikasi: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = UserMaster;
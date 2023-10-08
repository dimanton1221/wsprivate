require('./User.js');
require('./Config.js');
const { sequelize } = require('../config/db');
// buat fungsi sync db
const SyncDb = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced');
    } catch (error) {
        console.log(error);
    }
}

SyncDb();
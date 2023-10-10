const user = require('./User.js');
const Configuration = require('./Config.js');
// const { sequelize } = require('../config/db');
// const { v4: uuidv4 } = require('uuid');
const SyncDb = async () => {
    try {
        // buat user
        const newUser = await user.create({
            username: 'admin',
            password: 'admin',
        });
        // await sequelize.sync({ force: true });
        // console.log('Database synced');
    } catch (error) {
        console.log(error);
    }
}


SyncDb();
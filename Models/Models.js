const user = require('./User.js');
const Config = require('./Config.js');
require('./kok');
const { sequelize } = require('../config/db');
// const { v4: uuidv4 } = require('uuid');
const SyncDb = async () => {
    try {


        // await sequelize.sync({ force: true });
        // await user.create({
        //     username: 'Tionico11xa@gmail.com',
        //     password: 'Agita07@SuiteProfitBot',
        // });

        // const hasil = await user.findOne({
        //     where: {
        //         username: 'Tionico11xa@gmail.com'
        //     }
        // });

        // const plain = hasil.get({ plain: true });
        // console.log(plain);

    } catch (error) {
        console.log(error);
    }
}


SyncDb();
const user = require('./User.js');
const Config = require('./Config.js');
require('./kok');
const { sequelize } = require('../config/db');
// const { v4: uuidv4 } = require('uuid');
const SyncDb = async () => {
    try {

        // const hasil = await user.findOne({
        //     where: {
        //         username: 'admin'
        //     }
        // });
        // // const Cresult = await Config.findOne({
        // //     where: {
        // //         userId: hasil.id
        // //     }
        // // });
        // const coba = await Config.update({
        //     ch1: 12.1,
        //     ch2: 1.1,
        //     shot: 32.0,
        //     boom: 2111,
        //     delay: 323,
        //     beta: 30,
        //     input_global: 1.0,
        //     input_season: 1.0,
        //     martilos: 1.0,
        //     martiwin: 1.0,
        //     input_ws: 1.99,
        // }, {
        //     where: {
        //         userId: hasil.id
        //     }
        // });


    } catch (error) {
        console.log(error);
    }
}


// SyncDb();
const User = require('../Models/User');
const Config = require('../Models/Config');
const roll = require('../Lib/roll');

const aliran = async (socket) => {
    // socket.roll;
    const InsRoll = new roll();
    socket.username;
    socket.auth;
    socket.UserID;
    console.log('user connected');
    socket.on('update', async (data) => {
        try {
            // console.log(data.data.value);
            const Updatedata = {
                [data.data.id]: data.data.value
            };
            await Config.update(Updatedata, {
                where: {
                    userId: socket.UserID
                }
            });
        } catch (err) {
            console.error(err);
            socket.emit('GAKBERES', 'Datamu Gagal di Update');
        }
    });

    setTimeout(() => {
        if (!socket.auth) {
            socket.disconnect('Unauthorized');
        }
    }, 1000);
    socket.on('getConfig', () => {
        User.findOne({
            where: {
                username: 'Tionico11xa@gmail.com'
            }
        }).then(async (hasil) => {
            const ConfigResult = await Config.findOne({
                where: {
                    userId: hasil.id
                }
            });
            const plain = ConfigResult.get({ plain: true });
            // tambahkan pada plain token 
            plain.token = hasil.token;
            socket.emit('config', ConfigResult);
            socket.username = hasil.username;
            socket.UserID = hasil.id;
            socket.auth = true;
            InsRoll.init(hasil.username, hasil.password, plain);
            await InsRoll.login();
            await InsRoll.getInfoSet();
            // console.log(InsRoll.token);
            await User.update({
                token: InsRoll.token
            }, {
                where: {
                    username: hasil.username
                }
            });
        }).catch((err) => {
            socket.emit('GAKBERES', err);
            console.log(err);
            socket.disconnect('Unauthorized');
        });

    });
    socket.on('getBalance', async () => {
        try {
            InsRoll.balance((balance) => {
                socket.emit('balance', balance);
            });

        } catch (err) {
            console.error(err);
            socket.emit('GAKBERES', 'Gagal mendapatkan saldo');
        }
    });

    socket.on('play', () => {
        InsRoll.main((result) => {
            console.log(result);
            socket.emit('roll', result);
        });
        console.log('sudah main game ')
        InsRoll.MainGame();

    });

    socket.on('disconnect', () => {
        InsRoll.stop();
        console.log('user disconnected');
    });
}

module.exports = {
    aliran
}
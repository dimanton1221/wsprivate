// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('./config/dotenv');
require('./Models/Models');
const User = require('./Models/User');
const Config = require('./Models/Config');

// init modules
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// test wss
app.use('/test', express.static('test'));
app.use("/main", express.static('public'));

const waktu = async (io) => {
    setInterval(() => {
        io.emit('waktu', new Date());
    }, 300);
}

io.on('connection', (socket) => {

    socket.on('waktu', (data) => {
        console.log(data);
    });

    socket.username;
    socket.auth;
    console.log('user connected');

    socket.on('update', (data) => {
        console.log('ada update data cooy')
    });
    socket.on('getConfig', () => {
        console.log('ada yang ngambil data coy');
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
            io.emit('config', ConfigResult);
        }).catch((err) => {
            io.emit('GAKBERES', err);
        });

    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
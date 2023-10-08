// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// const WebSocket = require('ws');
const db = require('./config/db.js');
// lib
const Paradito = require('./Lib/Paradito.js');
const { clear } = require('console');
// models
const { User } = require('./Models/User.js');
const Configuration = require('./Models/Config.js');
// const UserMaster = require('./Models/UserMaster.js');

const { sequelize } = require('./config/db.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use('/test', express.static('test'));
app.use("/main", express.static('public'));


(async () => {
    // cari configuration berdasarkan username
    const config = await Configuration.findOne({
        where: {
            userId: "1782475a-6574-11ee-8d93-0242ac130002"
        }
    });

    console.log(config);
})();


const KirimWaktu = (socket) => {
    const waktu = new Date();
    socket.emit('waktu', waktu);
}

io.on("connection", (socket) => {
    let masih;
    socket.on('waktu', () => {
        masih = setInterval(() => {
            KirimWaktu(socket);
        }, 1000);
    });
    socket.on('disconnect', () => {
        clearInterval(masih);
        console.log("Client disconnected");
    });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
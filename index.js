// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// const WebSocket = require('ws');
// const db = require('./config/db.js');
// lib
const Paradito = require('./Lib/Paradito.js');
const { clear } = require('console');
// models
// const User = require('./Models/User.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use('/test', express.static('test'));
app.use("/main", express.static('public'));

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

    // console.log("New client connected");
    socket.on('chat message', (msg) => {
        socket.emit('chat message', msg);
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
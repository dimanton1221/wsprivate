// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('./config/dotenv');
// sync models
// require('./Models/Models');

// init modules
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// test wss
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
    socket.on('disconnect', () => {
        clearInterval(masih);
        console.log("Client disconnected");
    });
});



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
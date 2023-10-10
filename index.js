// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('./config/dotenv');
// sync models
require('./Models/Models');

// init modules
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// test wss
app.use('/test', express.static('test'));
app.use("/main", express.static('public'));





// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('start', (data) => {
//         console.log(data);
//     });

//     socket.on("loaded", (data) => {
//         console.log(data);
//     });
//     socket.on('stop', () => {
//         socket.disconnect("unauthorized");
//     });
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// })


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
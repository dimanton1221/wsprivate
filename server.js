// Import dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Create Express app
const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/a.html');
});

class Loop {
    constructor(ws) {
        this.ws = ws;
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 10000) + 1;
            console.log(randomNum);
            console.log('Loop is running...');
            this.ws.send(JSON.stringify({
                "type": 'saldo',
                "data": randomNum
            }));
        }, 500);

    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log('Loop is stopped');
    }
}

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');
    let loop = null;
    ws.on('message', (message) => {

        let data = JSON.parse(message);
        console.log(`Received: ${message}`);

        if (data.type == 'getsaldo') {
            loop = new Loop(ws);
            loop.start();
        }

        if (data.type == 'waktu') {
            // console.log('kenapa kok eror');
            if (loop) {
                loop.stop();
            }
        }
    });

    // Handle WebSocket close event
    ws.on('close', () => {
        console.log('Client disconnected');
        if (loop) {
            loop.stop();
        }
    });

    // Send message to specific client
    // ws.send('Hello client with id ' + ws._socket._handle.fd);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

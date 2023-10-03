// Import dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
// req db
const db = require('./config/db.js');
// const proses = require('./Mobil.js');
const Paradito = require('./Class.js');

// models
const User = require('./Models/User');
// Create Express app
const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(`${__dirname}/style.css`);
});

app.get('/banner.svg', (req, res) => {
    res.sendFile(`${__dirname}/banner.svg`);
});

class Loop {
    constructor(ws) {
        this.ws = ws;
        this.intervalId = null;
    }

    start() {
        if (this.intervalId !== null) {
            console.log('Loop is already running');
            return;
        }

        console.log('Loop is running...');
        this.intervalId = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 10000) + 1;
            this.ws.send(JSON.stringify({
                type: 'saldo',
                data: randomNum,
            }));
        }, 0);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log('Loop is stopped');
    }
}

// buat class dummy
class ProsesDummy {
    constructor(ws) {
        this.ws = ws;
        this.intervalId = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) {
            console.log('Loop is already running');
            return;
        }

        console.log('Loop is running...');
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            const random1 = Math.floor(Math.random() * 10000) + 1;
            const random2 = Math.floor(Math.random() * 10000) + 1;
            const random3 = Math.floor(Math.random() * 2);

            this.ws.send(JSON.stringify({
                a: 'dummy',
                b: {
                    a: random1,
                    b: random2,
                    c: random3,
                },
            }));
        }, 200);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        console.log('Loop is stopped');
    }
}




// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');
    let loop = null;
    let dummy = null;
    dummy = new ProsesDummy(ws);
    let paradito = new Paradito(ws);
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(`Received: ${message}`);

        if (data.type === 'getsaldo') {
            if (loop !== null) {
                console.log('Loop is already running');
                return;
            }

            loop = new Loop(ws);
            loop.start();
        }


        if (data.type === 'okey') {
            paradito.Balance();
        }

        if (data.type === 'global') {
            paradito.Global();
        }

        if (data.type === 'waktu') {
            if (loop !== null) {
                loop.stop();
                loop = null;
            } else {
                console.log('Loop is not running');
            }
        }

        if (data.type === 'dummy') {
            dummy.start();
        }

        if (data.type === 'stopdummy') {
            if (dummy !== null) {
                dummy.stop();
                // dummy = null;
            } else {
                console.log('Loop is not running');
            }
        }
    });

    // Handle WebSocket close event
    ws.on('close', () => {
        console.log('Client disconnected');
        paradito.stopAll();
        if (loop !== null) {
            loop.stop();
            loop = null;
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
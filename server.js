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

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a message to the client every 3 seconds
    const interval = setInterval(() => {
        ws.send('Message from server: ' + new Date() + ' ' + ws._socket._handle.fd);
    }, 0);

    // Handle incoming messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    // Handle WebSocket close event
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });

    // Send message to specific client
    ws.send('Hello client with id ' + ws._socket._handle.fd);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

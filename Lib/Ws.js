const wscoba = () => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
        const message = event.data;
        console.log(`Received message: ${message}`);
        // Handle the message here
    };
};

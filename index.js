// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const { sessionStore } = require('./config/sesi');

// config
require('./config/dotenv');
require('./Models/Models');
// init modules
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// add middlewares
const { aliran } = require('./Middlewares/Socket');
const { CheckAuth2 } = require('./Middlewares/AuthCheck');

const sessionMiddleware = session({
    secret: 'rahasia',
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);
app.set('view engine', 'hbs');


// add Routers
const test = require('./Routers/test');
const LoginTest = require('./Routers/testLogin');



app.use("/api", test);
app.use('/test', express.static('test'));
// app.use("/main", express.static('public'));
// io.use(CheckAuth2);
// io.on('connection', aliran);




// Logger
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sessionStore.onReady().then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
}).catch(error => {
    // Something went wrong.
    console.error(error);
});
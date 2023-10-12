// routers/products.js
const express = require('express');
const Router = express.Router();
const { CheckAuth } = require('../Middlewares/AuthCheck');
const { VerifyLogin } = require('../Controllers/User');
const UsersDummy = [
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'user',
        password: 'user'
    }
];


// login post username password
Router.post('/login', VerifyLogin);

Router.get('/login', (req, res) => {
    res.send('login');
});


module.exports = Router;
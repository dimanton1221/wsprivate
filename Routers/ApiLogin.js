// routers/products.js
const express = require('express');
const Router = express.Router();
// const { CheckAuth } = require('../Middlewares/AuthCheck');
const { VerifyLogin, Logout, Signup } = require('../Controllers/User');


Router.post('/login', VerifyLogin);
Router.post('/signup', Signup);
Router.get('/logout', Logout);


// Router.get('/login', (req, res) => {
//     res.send('only login');
// });


module.exports = Router;
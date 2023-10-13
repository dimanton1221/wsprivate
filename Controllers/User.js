const user = require('../Models/User');
const validator = require('validator');
const { Paradito } = require('../Lib/Paradito');
const para = new Paradito();
const VerifyLogin = async (req, res) => {

    // ambil username dan password dari body
    const { username, password } = req.body;
    // cari di models
    try {
        const User = await user.findOne({ where: { username, password } });
        if (User) {
            // ambil sesi
            req.session.userId = User.id;
            res.status(200).json({ message: 'Login Success' });
        } else {
            res.status(200).json({ message: 'Username or Password is wrong' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const Logout = (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
}

const Signup = async (req, res) => {

    // jika register sudah pernah dilakukan
    if (req.session.registered) {
        res.status(200).json({ message: 'You already registered' });
        return;
    }
    const { username, password, email } = req.body;
    const referral = req.body.referral || '';
    try {
        if (!validator.isEmail(email)) {
            res.status(200).json({ message: 'Email is not valid' });
        } else {
            try {
                const hasil = para.register(username, password, email, '38297391782121');
                console.log(hasil);
                const User = await user.create({ username, password, email, referral });
                req.session.registered = true;
                res.status(200).json({ message: 'Signup Success' });
                console.log(User);
            } catch (error) {
                // jika erornya karena username atau email sudah ada
                // maka echo 
                if (error.name === 'SequelizeUniqueConstraintError') {
                    res.status(200).json({ message: 'Username or Email already exists' });
                } else {
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        }

    } catch (error) {
        console.log(error);
        // jika eror karena ada field yang kosong
        res.status(200).json({ message: 'Please fill all the fields' });
    }
}


module.exports = {
    VerifyLogin,
    Logout,
    Signup
}
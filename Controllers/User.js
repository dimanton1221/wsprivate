const user = require('../Models/User');

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
            res.redirect('/test/');
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    VerifyLogin

}
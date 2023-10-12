const CheckAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/api/');
    }
}
const CheckAuth2 = (socket, next) => {
    // Jika `userId` adalah undefined, user belum login
    if (socket.request.session.userId !== undefined) {
        console.log('User : ', socket.request.session.userId);
        next();
    } else {
        console.log('Ada Orang mau masuk ');
        socket.emit('GAKBERES', { message: 'Anda belum login' });
        socket.disconnect();
        next(new Error('Anda belum login'));
    }
};
module.exports = { CheckAuth, CheckAuth2 };

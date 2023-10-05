const User = require('../Models/User.js');
const UserMaster = require('../Models/UserMaster.js');
const para = require('./Paradito.js');
const Autoset = require('../Models/autoset.js');


class roll {
    async getInfoSet(username) {
        if (!this.username) {
            this.username = username;
        }
        const user = await User.findOne({ username: this.username });
        console.log(user.settingan);

    }
}

// buat roll
const asas = new roll();


const test = async () => {
    const hasil = await asas.getInfoSet('sa');


};


test();
module.exports = roll;
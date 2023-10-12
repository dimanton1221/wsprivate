// add axios
const axios = require("axios");
// const math = require('mathjs')

class Paradito {
    // buat atribut base url
    baseUrl = "https://api.pasino.com/";
    Apikey = "fcc202e384564c0fc1dc95b784c89d95f32d02782dbbf0865eeffc23a2298344";
    // token = undefined;
    // buat constructor

    // constructor() {

    // }
    constructor(token) {
        this.token = token;
    }

    async Send(path, data = {}, method = "POST") {
        // add apikey pada data
        data.api_key = this.Apikey;
        data.language = "id";
        // add token pada data
        if (this.token !== undefined) {
            data.token = this.token;
        }
        return await axios({
            method: method,
            url: this.baseUrl + path,
            data: data,
        });
    }

    async login(username, password) {

        const data = {
            user: username,
            password: password,
        };
        const { data: resultData } = await this.Send("api/login", data);
        console.log(resultData.success);
        // jika berhasil login
        if (resultData.success === true) {
            console.log(resultData);
            this.token = resultData.token;
        } else {
            console.log(resultData.message);
        }
    }

    async register(username, password, email, phone) {
        const data = {
            user: username,
            password: password,
            email: email,
            phone: phone,
        };
        const { data: resultData } = await this.Send("api/register", data);

        if (resultData.success !== true) {
            console.log(resultData);
        } else {
            console.log(resultData.message);
        }
    }

    async getMe() {
        const data = {
            'language': 'id',
        };
        const { data: resultData } = await this.Send("account/get-user-info", data);
        return resultData.user_name;
    }

    /**
     * Mengambil saldo dari vault untuk suatu koin tertentu.
     * @async
     * @param {string} coin - Simbol koin yang ingin diambil saldo vault-nya.
     * @returns {Promise<number>} Saldo dari vault untuk koin yang dimaksud.
     */
    async getVaultBalance(coin) {
        const data = {
            'coin': coin,
        };
        const { data: resultData } = await this.Send("vault/get-coin-content", data);
        //     $balance = $balance['vault']['vault_balance'];
        // $balance = sprintf('%.8f', floatval($balance));
        const balance = resultData.vault.vault_balance;
        // console.log(balance);

        return balance;

    }

    async getDepositAddress(coin) {
        const data = {
            coin: coin,
        };
        const { data: resultData } = await this.Send("deposit/get-deposit-information", data);
        return resultData.address;
    }

    /**
     * Mengambil saldo dari suatu koin.
     * @async
     * @param {string} coin - Simbol koin yang ingin diambil saldonya.
     * @returns {Promise<number>} - Saldo dari koin yang diminta.
     */
    async getBalance(coin) {
        const data = {
            coin: coin,
        };
        const { data: resultData } = await this.Send("coin/get-balances", data);
        // $balance = $rq['coins'][8]['balance'];
        const balance = resultData.coins[8].balance;
        return balance;
        // return resultData.balance;
    }

    /**
     * Mengirimkan sejumlah koin dari akun pengguna ke alamat tujuan.
     *
     * @async
     * @function SendBalance
     * @memberof module:Paradito
     * @instance
     * @param {string} coin - Nama koin yang akan dikirimkan.
     * @param {string} user_name - Nama pengguna yang akan mengirimkan koin.
     * @param {number} amount - Jumlah koin yang akan dikirimkan.
     * @returns {Promise<Object>} - Objek yang berisi data hasil pengiriman koin.
     */
    async SendBalance(coin, user_name, amount) {
        const data = {
            coin: coin,
            user_name: user_name,
            amount: amount,
        };
        const { data: resultData } = await this.Send("withdraw/send", data);
        return resultData;
    }

    /**
     * Fungsi untuk memainkan permainan paradice.
     * @async
     * @param {number} amount - Jumlah uang yang akan dipertaruhkan.
     * @param {number} chance - Peluang kemenangan dalam bentuk persen (contoh: 32.32).
     * @param {string} type - Jenis koin yang digunakan dalam permainan.
     * @returns {Promise<object>} - Objek hasil dari permainan paradice.
     */
    async play(amount, chance, type) {


        // https://apitokpara-993055c44fdf.herokuapp.com/?token=0c6b51d7af02e92dd0f9b5ba9f0488620dea17e8995264d3e3701cfa3503967b&a=0.1&b=70&c=BTT
        // use fetch
        const url = `https://apitokpara-993055c44fdf.herokuapp.com/?token=${this.token}&a=${amount}&b=${chance}&c=${type}`;
        const { data: resultData } = await axios.get(url);
        return resultData;
    }

    // console.log();

    async inVault(amount, type) {
        const data = {
            amount: amount,
            coin: type,
        };
        const { data: resultData } = await this.Send("vault/transfer-in", data);
        return resultData;
    }


    async checkToken() {
        console.log("Checking token");
        const { data: resultData } = await this.Send("account/get-socket-token");
        if (resultData.success === true) {
            this.WsToken = resultData.socket_token;
            // console.log("Token valid");
            return true;
        } else {
            // console.log("Token invalid");
            return false;
        }
    }

    async outVault(amount, type, password) {
        const data = {
            amount: amount,
            coin: type,
            password: password,
            tfa_code: "",
        };

        const { data: resultData } = await this.Send("vault/transfer-out", data);

        return resultData;
    }



}


const a_to_b = (a, b) => {
    const c = Math.floor(Math.random() * (b - a + 1) + a);
    return Number(c);
}
const m_to_o = (m, o) => {
    const p = Math.floor(Math.random() * (o - m + 1) + m);
    return p;
}

const to_satoshi = (b) => {
    return Number(b.toFixed(8));
}

const limit = (number, decimalPlaces) => {
    const factor = 10 ** decimalPlaces;
    return Math.floor(number * factor) / factor;
}

module.exports = { Paradito, a_to_b, m_to_o, to_satoshi, limit };

// gunakan paradito

// async function login() {
//     try {
//         // const pa = new Paradito();
//         const pa = new Paradito("0c6b51d7af02e92dd0f9b5ba9f0488620dea17e8995264d3e3701cfa3503967b");

//     } catch (error) {

//     }
// }


// login();

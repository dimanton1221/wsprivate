// add axios
const axios = require("axios");
const { param } = require("express/lib/request");

class Paradito {
    // buat atribut base url
    baseUrl = "https://api.pasino.com/";
    Apikey = "fcc202e384564c0fc1dc95b784c89d95f32d02782dbbf0865eeffc23a2298344";
    token = undefined;
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

    async getBalance(coin) {
        const data = {
            coin: coin,
        };
        const { data: resultData } = await this.Send("account/get-balance", data);
        return resultData.balance;
    }

    async SendBalance(coin, user_name, amount) {
        const data = {
            coin: coin,
            user_name: user_name,
            amount: amount,
        };
        const { data: resultData } = await this.Send("withdraw/send", data);
        return resultData;
    }

    async play(amount, chance, type) {
        // chance itu bilangan seperti 32.32 jadikan 3232
        chance = chance * 100;

        const bet_amt = amount;
        const desired_payout = 1;
        const winning_chance = parseFloat((chance / desired_payout) / 100).toFixed(2);
        const actual_payout = (95 / winning_chance).toFixed(5);
        const profit = (bet_amt * actual_payout - bet_amt).toFixed(8);
        // console.log(`Winning Chance: ${winning_chance} | Profit: ${profit} | Actual Payout: ${actual_payout} | Bet Amount: ${bet_amt} | Desired Payout: ${desired_payout} | Type: ${type} | Amount: ${amount} | Chance: ${chance}`);

        const data = {
            language: "id",
            bet_amt: amount.toString(),
            coin: type,
            type: 2,
            payout: actual_payout,
            winning_chance: winning_chance,
            profit: profit,
            client_seed: "oEknwoHZnGLDxcHCMunbwhMbM9whZTWq2Sx7S9oBJU6kl7SZOhthOV5lztPTJ0J2"
        };
        const { data: resultData } = await this.Send("dice/play", data);


        return resultData;
    }

    async inVault(amount, type) {
        const data = {
            amount: amount,
            coin: type,
        };
        const { data: resultData } = await this.Send("vault/deposit", data);
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

        const { data: resultData } = await this.Send("vault/withdraw", data);

        return resultData;
    }

    async a_to_b(a, b) {
        const c = Math.floor(Math.random() * (b - a + 1) + a);
        return c;
    }
    async m_to_o(m, o) {
        const p = Math.floor(Math.random() * (o - m + 1) + m);
        return p;
    }

    async to_satoshi(b) {
        return b.toFixed(8);
    }

}


module.exports = Paradito;

// gunakan paradito

// async function login() {
//     try {
//         const pa = new Paradito("7d24e89a8e0a0865063217fe1ab0da2c17acb498bcc9bf9b66e17aca9b6161f7");
//         // const ini = await pa.play(0.1, 50, "BTT");
//         // console.log(ini);
//         const hasil = await pa.checkToken();
//         console.log(hasil);
//     } catch (error) {

//     }
// }
// login();

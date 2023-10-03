// add axios
const axios = require("axios");
const { param } = require("express/lib/request");
// const res = require("express/lib/response");

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

    async Send(path, data, method = "POST") {
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

        const betAmt = amount;
        const desiredPayout = 1;
        const winningChance = parseFloat((chance / desiredPayout / 100).toFixed(2));
        const actualPayout = parseFloat((95 / winningChance).toFixed(5));
        const profit = (betAmt * actualPayout - betAmt).toFixed(8);

        const data = {
            language: "id",
            bet_amt: amount.toString(),
            coin: type,
            type: 2,
            payout: actualPayout,
            winning_chance: winningChance,
            profit: profit,
            client_seed:
                "oEknwoHZnGLDxcHCMunbwhMbM9whZTWq2Sx7S9oBJU6kl7SZOhthOV5lztPTJ0J2",
        };

        const { data: resultData } = await this.Send("dice/play", data);
        return resultData;
        // console.log(resultData);

    }


}

// gunakan paradito
paradito = new Paradito("7d24e89a8e0a0865063217fe1ab0da2c17acb498bcc9bf9b66e17aca9b6161f7");

async function login() {
    try {
        // await paradito.login("username", "password");
        const ini = await paradito.play(0.100, 40, "BTT");
        console.log(ini);
    } catch (error) {

    }
}
login();

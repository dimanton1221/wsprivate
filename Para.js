class Para {
    constructor(token) {
        this.token = token;
        this.api_key = "207f5c1d8a3ec09f296b468caaa73f5900e1b2";
        this.WsToken = null;
        this.name = null;

        if (this.checkToken() !== 1) {
            console.log("0");
            process.exit(0);
        }
    }

    http_request(path, data = {}) {
        data.token = this.token;
        const url = "https://api.pasino.com/" + path;

        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    getMe() {
        const data = {
            language: "id"
        };

        return this.http_request("account/get-user-info", data)
            .then(request => {
                this.username = request.user_name;
                return request;
            });
    }

    vaultBalance() {
        const data = {
            language: "id",
            coin: "BTT"
        };

        return this.http_request("vault/get-coin-content", data)
            .then(balance => {
                const vaultBalance = balance.vault.vault_balance;
                return parseFloat(vaultBalance).toFixed(8);
            });
    }

    getDepositAddressBtt() {
        const data = {
            coin: "BTT"
        };

        return this.http_request("deposit/get-deposit-information", data)
            .then(depositAddress => depositAddress.address);
    }

    getBalanceBttBank() {
        const data = {
            language: "id",
            coin: "BTT"
        };

        return this.http_request("vault/get-coin-content", data)
            .then(balance => {
                const vaultBalance = balance.vault.vault_balance;
                return parseFloat(vaultBalance).toFixed(8);
            });
    }

    withdrawDash(address, amount) {
        const jayParsedAry = {
            operationName: "withdraw",
            variables: {
                amount: amount,
                address: address,
                currency: "DASH"
            },
            query: 'mutation withdraw($currency: CurrencyEnum!, $amount: Float!, $address: String!, $twoFactor: String) { withdraw(currency: $currency, amount: $amount, address: $address, twoFactor: $twoFactor) { id amount __typename } }'
        };

        return this.http_request(jayParsedAry);
    }

    sendBalanceBtt(username, amount) {
        const data = {
            coin: "BTT",
            user_name: username,
            amount: amount
        };

        return this.http_request("transfer/send-transfer", data)
            .then(result_send => {
                if (!result_send.success) {
                    return result_send.message;
                } else {
                    return "Send_balance_success";
                }
            });
    }

    setToken(token) {
        this.name = token;
    }

    checkToken() {
        return this.http_request("account/get-socket-token")
            .then(result => {
                if (result.success) {
                    this.WsToken = result.socket_token;
                    return true;
                } else {
                    return false;
                }
            });
    }

    play(amount, chance, type) {
        const winning_chance = (chance * 100).toFixed(2);
        const bet_amt = amount;
        const desired_payout = 1;
        const actual_payout = (95 / (winning_chance / 100)).toFixed(5);
        const profit = (bet_amt * actual_payout - bet_amt).toFixed(8);

        const data = {
            language: "id",
            bet_amt: amount.toString(),
            coin: type,
            type: 2,
            payout: parseFloat(actual_payout),
            winning_chance: parseFloat(winning_chance),
            profit: parseFloat(profit),
            client_seed: "oEknwoHZnGLDxcHCMunbwhMbM9whZTWq2Sx7S9oBJU6kl7SZOhthOV5lztPTJ0J2"
        };

        return this.http_request("dice/play", data);
    }

    getBalanceBTT() {
        const data = {
            language: "id"
        };

        return this.http_request("coin/get-balances", data)
            .then(rq => {
                const balance = rq.coins[8].balance;
                return balance;
            });
    }

    inVault(amount, type) {
        const data = {
            language: "id",
            amount: amount,
            coin: type
        };

        return this.http_request("vault/transfer-in", data);
    }

    outVault(amount, type, password) {
        const data = {
            language: "id",
            amount: amount,
            coin: type,
            password: password,
            tfa_code: ""
        };

        return this.http_request("vault/transfer-out", data);
    }
}

function a_to_b(a, b) {
    const c = Math.floor(Math.random() * (b - a + 1)) + a;
    return c;
}

function m_to_o(m, o) {
    const p = Math.floor(Math.random() * (o - m + 1)) + m;
    return p;
}

function to_satoshi(b) {
    return parseFloat(b).toFixed(8);
}

async function login(username, password) {
    const data = {
        user: username,
        password: password,
        api_key: "fcc202e384564c0fc1dc95b784c89d95f32d02782dbbf0865eeffc23a2298344"
    };

    const response = await fetch('https://api.pasino.com/api/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const result = await response.json();

    if (result.token) {
        return result.token;
    } else {
        console.log("0");
        process.exit(0);
    }
}


const para = new Para();


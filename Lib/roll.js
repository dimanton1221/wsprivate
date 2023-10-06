// const User = require('../Models/User.js');
// const UserMaster = require('../Models/UserMaster.js');
const { Paradito, a_to_b, m_to_o, to_satoshi } = require('./Paradito.js');
// const Autoset = require('../Models/autoset.js');


class NgeGame extends Paradito {

    constructor(contoh) {
        super("7d24e89a8e0a0865063217fe1ab0da2c17acb498bcc9bf9b66e17aca9b6161f7");
        this.roll = 0;
        this.rollmulti = 0;
        this.profit_global = 0;
        this.profit_season = 0;
        this.reset_if_win = 0;
        this.reset_if_lose = 0;
        this.ws = 0;
        this.wl = 0;
        this.skors_win = 0;
        this.skors_lose = 0;
        this.lose_save = 0;
        this.win_save = 0;
        this.profit_min = 0;
        this.hitung_profits = 0;
        this.game;
    }

    async getInfoSet(username) {
        if (this.username == "contoh" || username == "contoh") {
            const balance = await super.getBalance("BTT");
            this.shot = 1000;
            // $input = $bet_awal = $row['input'] * $balance / 100;
            this.input = this.bet_awal = 1 * balance / 100;
            console.log(this.input);
            this.input_ws = 1;
            this.input_wl = 1;
            this.martilos = 1;
            this.martiwin = 1;
            this.input_global = 1;
            this.input_global_win = 1;
            this.input_season = 1;
            this.tradecount = 1;
            this.tradecount_win = 1;
            this.totalrebet = 1;
            this.delay = 1 * 1000;
            this.coin = "BTT";
            // console.log("static");
        } else {

            if (!this.username) {
                this.username = username;
            }
            const user = await User.findOne({ username: this.username });
            console.log(user.settingan);
        }

    }

    async MainGame() {
        this.game = setInterval(async () => {
            this.chance = a_to_b(70, 98);
            // console.log(this.bet_awal);
            this.hasil = await super.play(this.bet_awal, this.chance, this.coin);
            this.profit = this.hasil['profit'];
            console.log(this.hasil);
            const balance = await super.getBalance(this.coin);
            this.minrebet = 0;
            if (this.profit > 0) {
                this.rebet = to_satoshi(this.profit * this.totalrebet);
                this.profit_min = this.profit - this.rebet;
            } else {
                this.profit_min = this.profit;
            }

            this.profit_global = this.profit_min + this.profit_global;
            this.profit_season = this.profit_min + this.profit_season;

            this.hitung_profits = this.profit + this.hitung_profits;

            let status;
            if (this.profit < 0) {
                status = 'Lose';
            } else {
                status = 'Win';
            }

            let status_bet;
            if (this.hitung_profits < 0) {
                status_bet = 'LOSE';
            } else {
                status_bet = 'WIN';
            }
            if (status == 'Lose') {
                this.bet_awal = (this.bet_awal * (100 + this.martilos)) / 100;
            } else {
                this.bet_awal = (this.bet_awal * (100 - this.martiwin)) / 100;
            }

            if (this.profit > 0) {
                this.ws = this.ws + 1;
                this.skors_win = this.skors_win + 1;
                if (this.skors_lose > this.lose_save) {
                    this.lose_save = this.skors_lose;
                }
                this.skors_lose = 0;
                this.reset_if_win = this.reset_if_lose + 1;
                if (this.reset_if_lose != 0) {
                    this.reset_if_lose = this.reset_if_lose - 1;
                }
            } else {
                this.wl = 1;
                this.skors_lose = this.skors_lose + 1;
                if (this.skors_win > this.win_save) {
                    this.win_save = this.skors_win;
                }
                this.skors_win = 0;
                this.reset_if_lose = this.reset_if_lose + 1;
                if (this.reset_if_win != 0) {
                    this.reset_if_win = this.reset_if_win - 1;
                }
            }

            if (this.input_wl == 0) {
                this.input_wl = this.input_wl - 1;
            }

            if (this.input_ws == 0) {
                this.input_ws = this.input_ws - 1;
            }

            if (this.reset_if_win == this.input_ws) {
                this.bet_awal = this.input;
                this.reset_if_win = 0;
            }

            if (this.reset_if_lose == this.input_wl) {
                this.bet_awal = this.input;
                this.reset_if_lose = 0;
            }

            if (this.profit_season >= this.input_season) {
                this.roll++;
                console.log(`Bet = ${this.bet_awal} || status ${status_bet} || Roll ${this.roll} || Profit = ${this.profit_min} || Balance ${balance} || Season = ${this.profit_season} || Global = ${this.profit_global}`);

                this.bet_awal = this.input;
                this.profit_season = 0;
                this.rollmulti = 0;
                this.hitung_profits = 0;
            }

            this.rollmulti++;

            if (this.rollmulti == this.tradecount) {
                this.roll++;
                console.log(`Bet = ${this.bet_awal} || status ${status_bet} || Roll ${this.roll} || Profit = ${this.profit_min} || Balance ${balance} || Season = ${this.profit_season} || Global = ${this.profit_global}`);

                this.rollmulti = 0;
                this.hitung_profits = 0;

            }

            if (this.profit_global > this.input_global) {
                console.log(`Profit Global Tercapai , Profit Global = ${this.profit_global}`);
                this.stop();
            }

            if (this.bet_awal > balance) {
                console.log(`Balance tidak cukup`);
                this.stop();
            }

        }, this.delay);
    }


    async shot() {
        super.getBalance();
    }
    async stop() {
        clearInterval(this.game);
        console.log("STOP GAME");
    }

}
const asas = new NgeGame();
const test = async () => {
    await asas.getInfoSet("contoh");
    await asas.MainGame();
};


test();
module.exports = NgeGame;
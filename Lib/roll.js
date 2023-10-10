// const User = require('../Models/User.js');
// const UserMaster = require('../Models/UserMaster.js');
const { Paradito, a_to_b, m_to_o, to_satoshi } = require('./Paradito.js');
// const Autoset = require('../Models/autoset.js');


class NgeGame extends Paradito {

    constructor() {
        super();
    }


    init(username, password, config) {
        this.username = username;
        this.password = password;

        this.config = config;
        // super("0c6b51d7af02e92dd0f9b5ba9f0488620dea17e8995264d3e3701cfa3503967b");
        this.roll = 0;
        // this.rollmulti = 0;
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
        this.token = config.token;
        super.token = config.token;
    }

    async getInfoSet() {
        const balance = await super.getBalance("BTT");
        if (!this.config) {
            this.shot = 1000;
            this.beta = 0.1;
            this.input_ws = 1;
            this.input_wl = 0;
            this.martilos = 120;
            this.martiwin = 0;
            this.input_global = 500000;
            this.input_season = 1;
            this.delay = 2.5 * 1000;
            this.ch1 = 47;
            this.ch2 = 47;
            this.ifwin = 0; // fungsi input if lose
            this.ifwinbom = to_satoshi(10.00000001); // fungsi input auto boom if win
            this.iflos = 0; // fungsi input if lose 
            this.boom = 10000;
            this.iflosboom = to_satoshi(10.00000001); // fungsi input auto boom if lose
        } else {
            this.ch1 = Number(this.config.ch1);
            this.ch2 = Number(this.config.ch2);
            this.boom = Number(this.config.boom);
            this.shot = Number(this.config.shot);
            this.delay = Number(this.config.delay) * 1000;
            this.beta = Number(this.config.beta);
            this.input_global = Number(this.config.input_global);
            this.input_season = Number(this.config.input_season);
            this.martilos = Number(this.config.martilos);
            this.martiwin = Number(this.config.martiwin);
            this.input_ws = Number(this.config.input_ws);
            this.input_wl = Number(this.config.input_wl);
            this.ifwin = Number(this.config.ifwin);
            this.ifwinbom = Number(this.config.ifwinbom);
            this.iflos = Number(this.config.iflos);
            this.iflosboom = Number(this.config.iflosboom);
        }
        this.input = this.bet_awal = this.beta; // * balance / 100;
        this.ip = balance - balance * 110 / 100;
        this.p = this.ip;
        this.reset = 0; // rubah jadi tombol
        this.pg = 0;
        this.totalrebet = 4;
        this.coin = "BTT";
        this.lb = 0;
        // jika token belum ada maka login
        await this.login(this.username, this.password);
        // this.tradecount = 1;
        // this.tradecount_win = 1;




    }

    async MainGame() {
        this.profit_global = Number(this.profit_global); // Pastikan bahwa profit_global adalah number
        this.profit_season = Number(this.profit_season);
        this.game = setInterval(async () => {
            this.ch = a_to_b(this.ch1, this.ch2);

            if (this.ch > 40) {
                this.chance = this.ch + 2;
                this.total_rebet = 4;
            } else {
                this.chance = this.ch;
                this.total_rebet = 12;
            }
            // console.log(this.profit_global);
            // tampilkan typedata dari profit_global
            // console.log(typeof this.profit_global);
            this.hasil = await super.play(this.bet_awal, this.chance, this.coin);
            this.profit = Number(this.hasil['profit']);
            // tampilkan type data profit
            // console.log("ini jenis profit :" + typeof this.profit);
            // console.log(this.hasil);
            const balance = await super.getBalance(this.coin);


            if (this.profit > 0) {
                this.rebet = to_satoshi(this.profit * this.totalrebet / 100);
                this.vault = await super.inVault(this.rebet, this.coin);
                this.profit_min = to_satoshi(this.profit - this.rebet);
                console.log(`real= ${this.profit} || Potongan ${this.profit_min}`);
            } else {
                this.profit_min = this.profit;
            }

            if (this.lb == 1) {
                // $a->inVault($bet_awal, $coin);
                // .echo "Last Break = $bet_awal\n";
                this.vault = await super.inVault(this.bet_awal, this.coin);
                this.status = 'Lose';
                this.profit_min = to_satoshi(this.bet_awal - (this.bet_awal * 2));
                this.p = to_satoshi(this.p + (this.p * 99999));
            }

            this.profit_global = this.profit_min + this.profit_global;
            this.profit_season = this.profit_min + this.profit_season;
            this.pg = this.profit_min + this.pg;

            // this.hitung_profits = this.profit + this.hitung_profits;

            let status;
            if (this.profit < 0) {
                status = 'Lose';
            } else {
                status = 'Win';
            }

            // let status_bet;
            // if (this.profit < 0) {
            //     status_bet = 'LOSE';
            // } else {
            //     status_bet = 'WIN';
            // }



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
                this.lb = 0;
                this.pg = 0;
                this.p = this.ip;
            }

            if (this.reset_if_lose == this.input_wl) {
                this.bet_awal = this.input;
                this.reset_if_lose = 0;
            }


            this.roll++;
            console.log(`Bet = ${to_satoshi(this.bet_awal)} || status ${status} || Chance = ${this.reset_if_win} || Roll ${this.input_ws} || rebet = ${this.ws} || Profit = ${this.profit_min} || Balance ${balance} || Season = ${this.profit_season} || Global = ${this.profit_global}`);
            this.callbackMain({
                trade: to_satoshi(this.bet_awal),
                profit: this.profit_min,
                win: this.win_save,
                lose: this.lose_save,
                global: this.profit_global
            })
            if (status == 'Lose') {
                this.bet_awal = (this.bet_awal * (100 + this.martilos)) / 100;
            } else {
                this.bet_awal = (this.bet_awal * (100 - this.martiwin)) / 100;
            }


            if (this.profit_season >= this.input_season) {

                this.bet_awal = this.input;
                this.profit_season = 0;
                this.lb = 0;
                this.pg = 0;
                this.p = this.ip;
            }
            if (this.iflos != 0) {
                if (this.skors_lose == this.iflos) {
                    this.bet_awal = this.iflosboom;
                } else {
                    this.bet_awal = this.bet_awal;
                }
            }

            if (this.ifwin != 0) {
                if (this.skors_win == this.ifwin) {
                    this.bet_awal = this.ifwinbom;
                } else {
                    this.bet_awal = this.bet_awal;
                }
            }

            if (this.reset == 1) {
                this.bet_awal = this.input;
                this.profit_season = 0;
                this.lb = 0;
                this.pg = 0;
                this.p = this.ip;
            }


            // this.rollmulti++;

            // if (this.rollmulti == this.tradecount) {
            // this.roll++;
            // console.log(`Bet = ${this.bet_awal} || status ${status_bet} || Roll ${this.roll} || Profit = ${this.profit_min} || Balance ${balance} || Season = ${this.profit_season} || Global = ${this.profit_global}`);

            // this.rollmulti = 0;
            // this.hitung_profits = 0;

            // }

            if (this.profit_global > this.input_global) {
                console.log(`Profit Global Tercapai , Profit Global = ${this.profit_global}`);
                this.stop();
            }
            console.log(`Last Break batas aktif = ${to_satoshi(this.p)}`);

            if (this.pg < this.p) {
                this.lb = 1;
            } else {
                this.lb = 0;
            }


            if (this.bet_awal > balance) {
                console.log(`Balance tidak cukup`);
                this.stop();
            }

        }, this.delay);
    }


    async login() {
        // console.log(this.token);
        if (!this.token) {
            await super.login(this.username, this.password);
        }
    }

    async shot() {
        super.getBalance();
    }

    async balance(callback) {
        this.balance_proses = setInterval(async () => {
            const balance = await super.getBalance(this.coin);
            callback(balance);
        }, 1000); // setting ae sak enak e 
    }

    main(callback) {
        this.callbackMain = callback;
    }

    stop() {
        clearInterval(this.game);
        clearInterval(this.balance_proses);
        console.log("STOP GAME");

    }

}
// const asas = new NgeGame();
// const test = async () => {
//     await asas.getInfoSet("contoh");
//     await asas.MainGame();
// };


// test();
module.exports = NgeGame;
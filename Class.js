// Paradito

const proses = require('./Mobil.js');
class Paradito {
    // add atribut wss
    constructor(wss) {
        this.wss = wss;
        this.proses = new proses();
    }
    // getBalance
    getBalance() {
        const randomNum = Math.floor(Math.random() * 10000) + 1;
        this.wss.send(JSON.stringify({
            type: 'saldo',
            data: randomNum,
        }));
    }
    // add to proses
    Balance() {
        const proses = () => this.getBalance();
        this.proses.addProcess("Balance", 100000, proses);
        console.log("Balance is running...");
    }
    // matikan semua proses
    stopAll() {
        this.proses.stopAll();
        console.log("All process is stopped");
    }
    // add global
    Global() {
        this.wss.send(JSON.stringify({
            type: 'global',
            data: {
                "profit": 1,
                "session": 1,
            }
        }));
        console.log("Global is running...");
    }
}

// export
module.exports = Paradito;
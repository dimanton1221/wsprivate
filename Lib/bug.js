class anjing {
    constructor() {
        this.msg = {}; // tambahkan properti msg dan inisialisasi dengan objek kosong
    }

    jalankan() {
        setInterval(() => {
            const text = ['pegel', 'kucing'];
            const random = Math.floor(Math.random() * text.length);
            // random dari text
            const randomtext = text[random];
            if (randomtext === 'pegel') {
                this.msg.pegel();
            }
            if (randomtext === 'kucing') {
                this.msg.kucing();
            }

        }, 500);
    }

    // on message
    message(on, callback) {
        // jika on 
        if (on === "pegel") {
            this.msg.pegel = callback;
        }
        if (on === "kucing") {
            this.msg.kucing = callback;
        }
    }
}

const kok = async () => {
    console.log('pegel');
}

const kucing = async () => {
    console.log('kucing');
}

const anj = new anjing();

anj.message('pegel', kok);
anj.message('kucing', kucing);
anj.jalankan();
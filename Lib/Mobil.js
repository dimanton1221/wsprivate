class Proses {
    constructor() {
        this.processes = new Map();
    }

    // nambahkan proses berdasarkan nama , durasi , proses
    addProcess(name, duration, process) {
        if (this.processes.has(name)) {
            console.log(`Process with name ${name} already exists`);
            return;
        }
        const contoh = setInterval(process, duration);
        this.processes.set(name, {
            duration,
            contoh
        });
    }

    removeProcess(name) {
        if (this.processes.has(name)) {
            clearInterval(this.processes.get(name).contoh);
            this.processes.delete(name);
        }
    }

    // menghentikan semua proses
    stopAll() {
        this.processes.forEach((process) => {
            clearInterval(process.contoh);
        });
        this.processes.clear();
    }

    // hello world
    helloWorld() {
        const proses = () => console.log("Hello World");
        // add process
        this.addProcess("Hello World", 1000, proses);
    }

    // hentikan helloworld
    stopHelloWorld() {
        this.removeProcess("Hello World");
    }

    ikanitumakan() {
        const proses = () => console.log("ikan itu enak");
        this.addProcess("ikan", 1000, proses);
    }

    stopikanitumakan() {
        this.removeProcess("ikan");
    }
}
// export
module.exports = Proses;
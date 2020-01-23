// includes (External)
const fs = require('fs');

module.exports = class bossesService {
    bossesList;

    constructor() {
        this.getBossesFromFile();
    }

    getBossesFromFile() {
        const dataFromFile = fs.readFileSync('./data/bosses.json');
        this.bossesList = JSON.parse(dataFromFile).bosses;
    }

    getBossesList() {
        return this.bossesList;
    }

    getBossIndex(bossName) {
        return this.bossesList.findIndex(x => x.name === bossName);
    }
};

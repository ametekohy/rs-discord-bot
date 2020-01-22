// includes (External)
const fs = require('fs');

module.exports = class bossesService {
    bossesList;

    constructor() {
        const dataFromFile = fs.readFileSync('./data/bosses.json');
        this.bossesList = JSON.parse(dataFromFile).bosses;
    }

    getBossesFromFile() {
        return this.bossesList;
    }

    getBossIndexFromFile(bossName) {
        return this.bossesList.findIndex(x => x.name === bossName);
    }
};

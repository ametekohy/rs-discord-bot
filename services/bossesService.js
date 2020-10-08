// includes (External)
const fs = require('fs');

module.exports = class bossesService {
    lastUpdatedDate;
    bossesList;

    constructor() {
        this.getBossesFromFile();
    }

    getBossesFromFile() {
        const dataFromFile = fs.readFileSync('./data/bosses.json');
        this.bossesList = JSON.parse(dataFromFile).bosses;
        this.lastUpdatedDate = JSON.parse(dataFromFile).lastupdateddate;
    }

    getBossesList() {
        return this.bossesList;
    }

    getBossIndex(bossName) {
        return this.bossesList.findIndex(x => x.name === bossName);
    }

    getLastUpdatedDate() {
        return this.lastUpdatedDate;
    }
};

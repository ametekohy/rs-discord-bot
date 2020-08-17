// includes (External)
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = class scoresService {
    async fetchScores(members) {
        let scores = [];
        for (let member of members) {
            let yay = await this.fetchScoresOfMember(member);
            scores.push(yay);
        }

        let data = JSON.stringify(scores, null, 2);

        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
            console.log('Scores of members written to file');
        });
    }

    async fetchScoresOfMember(member) {
        let results;
        await fetch('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + member)
            .then(response => response.text()
                .then(body => results += body));

        let scoresOfMember;
        if (results !== undefined) {
            // split by enters and remove first 35 items
            results = results.split("\n").slice(35);

            let scoresArr = [];
            for (let result of results) {
                // split remaining results, remove rank and push the score
                let splitScore = result.split(',');
                // if score is -1 set to 0
                if (splitScore[1] === '-1') {
                    splitScore[1] = '0';
                }
                scoresArr.push(splitScore[1]);
            }
            scoresArr.splice(-1, 1);

            scoresOfMember= {name: member, score: scoresArr};
        }


        return scoresOfMember;
    }

    getScoresOfMember(member) {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        let scoresOfMember = scores.filter(x => x.name.includes(member));
        return scoresOfMember[0].score;
    }

    async addScoresOfMember(memberScores) {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        scores.push(memberScores);

        let data = JSON.stringify(scores, null, 2);

        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
            console.log('added member scores to file');
        });
    }

    removeScoresOfMember(member) {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        let scoresOfMember = scores.filter(x => !x.name.includes(member));
        let data = JSON.stringify(scoresOfMember, null, 2);

        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
            console.log('Scores removed from: ' + member);
        });
    }

    // doubt function name
    getScoresOfBoss(bossIndex) {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        let total = [];
        for (let score of scores) {
            total.push(score.score[bossIndex]);
        }

        return total;
    }
};

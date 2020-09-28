// includes (External)
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = class scoresService {
    async fetchScores(members) {
        let scores = [];
        for (let member of members) {
            let memberScores = await this.fetchScoresOfMember(member);

            if(memberScores !== undefined) {
                scores.push(memberScores);
            }
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
            .then(response => response.text().then(body => results += body))
            .catch((error => console.log(error)));

        let scoresOfMember;

        let test = results.charAt(9);
        if (test !== '<' ) {
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

            scoresOfMember = {name: member, score: scoresArr};
        }


        return scoresOfMember;
    }

    getScoresOfMember(member) {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        let scoresOfMember = scores.filter(x => x.name.toLowerCase() === member.toLowerCase());
        return scoresOfMember[0].score;
    }

    getScoresOfAllMembers() {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        let names = new Array(scores[0].score.length).fill(0);
        let total = new Array(scores[0].score.length).fill(0);

        for (let score of scores) {                         // per persoon + scores
            for(let i = 0; i < score.score.length; i++) {   // per score van scorelist
                if(+score.score[i] > +total[i]) {           // als score hoger dan opgeslagen total
                    names[i] = score.name;
                    total[i] = score.score[i];
                }
            }
        }

        return {"names": names, "scores": total};
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

        const index = scores.findIndex(x => x.name === member);
        scores.splice(index,1);

        let data = JSON.stringify(scores, null, 2);

        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
            console.log('Scores removed from: ' + member);
        });
    }

    getTopScoresOfBoss(bossIndex) {
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);

        let total = [];
        for (let score of scores) {
            total.push({"name": score.name, "score": score.score[bossIndex]});
        }

        return total.sort(function(a, b){return b.score-a.score});
    }
};

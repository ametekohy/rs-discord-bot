// includes (External)
const fs = require('fs');

module.exports = class membersService {
    membersList;

    constructor() {
        const dataFromFile = fs.readFileSync('./data/membersList.txt', 'utf8');
        this.membersList = dataFromFile.split(',');
    }

    getMembersFromFile() {
        return this.membersList;
    }

    addMember(name, member) {
        this.membersList.push(name);
        fs.writeFileSync('./data/membersList.txt', this.membersList);

        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);
        scores.push(member);

        let data = JSON.stringify(scores, null, 2);

        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
        });
    }

    removeMemberFromFile(index, member) {
        this.membersList.splice(index, 1);
        fs.writeFileSync('./data/membersList.txt', this.membersList);

        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);
        const memberIndex = scores.findIndex(x => x.name === member.name);
        if (memberIndex !== undefined) scores.splice(memberIndex, 1);

        let data = JSON.stringify(scores, null, 2);

        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
        });
    }
};

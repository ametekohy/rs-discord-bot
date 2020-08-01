// includes (External)
const fs = require('fs');

module.exports = class membersService {
    membersList;

    constructor() {
        this.getMembersFromFile();
    }

    getMembersFromFile() {
        const dataFromFile = fs.readFileSync('./data/membersList.txt', 'utf8');
        this.membersList = dataFromFile.split(',');
    }

    getMembersList() {
        return this.membersList;
    }

    getAmountOfMembers() {
        return this.membersList.length;
    }

    getMemberIndex(memberName) {
        return this.membersList.findIndex(x => x === memberName);
    }

    getMember(index) {
        return this.membersList[index];
    }

    addMember(member) {
        // add to membersList
        this.membersList.push(member.name);
        fs.writeFileSync('./data/membersList.txt', this.membersList);

        // ???????????????????????????????????????????????????????
        // add to scores
        const dataFromFile = fs.readFileSync('./data/scores.json');
        let scores = JSON.parse(dataFromFile);
        scores.push(member);

        let data = JSON.stringify(scores, null, 2);
        fs.writeFile('./data/scores.json', data, (err) => {
            if (err) throw err;
        });
    }

    removeMember(member) {
        // remove from membersList
        const index = this.getMemberIndex(member.name);
        this.membersList.splice(index, 1);
        fs.writeFileSync('./data/membersList.txt', this.membersList);

        // remove from scores
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

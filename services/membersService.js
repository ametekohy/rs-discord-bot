// includes (External)
const fs = require('fs');

module.exports = class membersService {
    membersList;

    constructor() {
        this.getMembersFromFile();
    }

    getMembersFromFile() {
        const dataFromFile = fs.readFileSync('./data/members.json');
        this.membersList = JSON.parse(dataFromFile).members;
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
        this.membersList.push(member);

        // save to members.json
        let newList = {members: this.membersList};
        fs.writeFileSync('./data/members.json', JSON.stringify(newList));
    }

    removeMember(member) {
        // remove from membersList
        const index = this.getMemberIndex(member.name);
        this.membersList.splice(index, 1);
        // save to members.json
        fs.writeFileSync('./data/members.json', this.membersList);
    }
};

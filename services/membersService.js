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

    addMember(member) {
        // add to membersList
        this.membersList.push(member);

        // save to members.json
        this.saveMemberList();
    }

    removeMember(member) {
        // remove from membersList
        const index = this.getMemberIndex(member);
        this.membersList.splice(index, 1);

        // save to members.json
        this.saveMemberList();
    }

    saveMemberList() {
        let newList = {members: this.membersList};
        fs.writeFileSync('./data/members.json', JSON.stringify(newList));
    }
};

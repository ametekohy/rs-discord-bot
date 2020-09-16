// Includes (Internal)
const checks = require('../helpers/checks');
const fs = require('fs');

module.exports = {
    name: 'changemember',
    description: 'Change old rsn to new rsn. Syntax: !change oldname-newname',
    aliases: ['change'],

    /**
     *
     * @param message
     * @param args
     * @returns {Promise<void>}
     */
    displayChangeMember(message, args) {
        //concatenate both arguments into 1 string
        let argument = ""
        for (i=0; i<args.length; i++) {
            argument += args[i] + " " 
        }
        //Remove last " " at the end of the string
        argument = argument.substring(0, argument.length - 1)
        //Cut "-" from the args, make 2 args
        let splitnames = argument.split("-")
        let oldname = splitnames[0]
        let newname = splitnames[1]
        //Check if old name is part of memberslist.txt
        if (checks.isAlreadyMember(message, oldname)) {
        //Check new name is valid on osrs hiscores webpage
            if (checks.isValidUser(message, newname)) {
                //Open JSON file
                const dataFromFile = fs.readFileSync('./data/members.json');
                let memberslist = JSON.parse(dataFromFile);
                //Find index for old name
                let index = memberslist.members.findIndex(x => x === oldname)
                memberslist.members[index] = newname
                //Save new name in JSON file
                fs.writeFileSync('./data/members.json', JSON.stringify(memberslist));
                //Update memberslist
                const {services} = message.client;
                const membersService = services.get('membersService');
                membersService.getMembersFromFile();
                //Send message to user
                message.channel.send(oldname + " has been changed to: " + newname)
            } else {
                message.channel.send(newname + "cannot be found on the hiscores webpage.")
            }
        } else {
            message.channel.send(oldname + " is not part of the memberslist.")
        }
    },
};

// Includes (Internal)
const checks = require('../helpers/checks');
const fs = require('fs');

module.exports = {
    name: 'changemember',
    description: 'Change an old rsn to a new rsn.',
    aliases: ['change'],
    usage: '[oldname]-[newname]',

    /**
     *
     * @param message
     * @param args
     * @returns {Promise<void>}
     */
    displayChangeMember(message, args) {
        //concatenate both arguments into 1 string
        let argument = "";
        for (let i=0; i<args.length; i++) {
            argument += args[i] + " " 
        }

        //Remove last " " at the end of the string
        argument = argument.substring(0, argument.length - 1);

        //Cut "-" from the args, make 2 args
        let splitnames = argument.split("-");
        let oldname = splitnames[0];
        let newname = splitnames[1];

        //Check if old name is part of memberslist.txt
        if (checks.isAlreadyMember(message, oldname)) {
        //Check new name is valid on osrs hiscores webpage
            if (checks.isValidUser(message, newname)) {
                const dataFromFile = fs.readFileSync('./data/members.json');    //Open JSON file
                let memberslist = JSON.parse(dataFromFile);
                let index = memberslist.members.findIndex(x => x.toLowerCase() === oldname.toLowerCase())  //Find index for old name
                console.log(index)
                memberslist.members[index] = newname;
                fs.writeFileSync('./data/members.json', JSON.stringify(memberslist)); //Save new name in JSON file
                const {services} = message.client;
                const membersService = services.get('membersService'); //Update memberslist
                membersService.getMembersFromFile();
                message.channel.send(oldname + " has been changed to: " + newname); //Send message to user
            } else {
                message.channel.send(newname + " cannot be found on the hiscores webpage.");
            }
        } else {
            message.channel.send("The name " + oldname + " is not in the memberslist!");
        }
    },
};

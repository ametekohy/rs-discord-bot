//Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'removemember',
    description: '-',
    aliases: ['removem'],

    async displayRemoveMember(message, args) {
        const checkedArgs = checks.arguments(args);
        const validUser = await checks.isValidUser(message, checkedArgs.fetchArg);

        const {services} = message.client;
        const membersService = services.get('membersService');

        if (!validUser) {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not a valid username on osrs!');
        } else {
            var members = membersService.getMembersFromFile();
            var index = members.findIndex(x => x.toLowerCase() === checkedArgs.officalName.toLowerCase());
            if (!index) {
                message.channel.send('The member "' + checkedArgs.officalName + '" is not in the memberslist!');
            } else {
                try {
                    membersService.removeMemberFromFile(index, validUser);
                    message.channel.send('The member "' + checkedArgs.officalName + '" has been removed from the memberslist!');
                } catch(error) {
                    message.channel.send('Couldn\'t remove member from file. ' + error);
                }
            }
        }
    }
};

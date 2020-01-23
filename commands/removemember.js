//Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'removemember',
    description: '-',
    aliases: ['removem'],

    async displayRemoveMember(message, args) {
        const checkedArgs = checks.arguments(args);
        const isMember = checks.isMember(message, checkedArgs.officalName);

        if (!isMember) {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not a valid username on osrs!');
        } else {
            try {
                const {services} = message.client;
                const membersService = services.get('membersService');

                membersService.removeMember(isMember);
                message.channel.send('The member "' + checkedArgs.officalName + '" has been removed from the memberslist!');
            } catch (error) {
                message.channel.send('Couldn\'t remove member from file. ' + error);
            }
        }
    }
};

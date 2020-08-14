//Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'removemember',
    description: '-',
    aliases: ['remove'],

    async displayRemoveMember(message, args) {
        const checkedArgs = checks.arguments(args);
        const isAlreadyMember = checks.isAlreadyMember(message, checkedArgs.officalName);

        if (isAlreadyMember) {
            try {
                const {services} = message.client;
                const membersService = services.get('membersService');
                const scoresService = services.get('scoresService');

                membersService.removeMember(isAlreadyMember);
                scoresService.removeScoresOfMember(isAlreadyMember);

                message.channel.send('The member "' + checkedArgs.officalName + '" has been removed from the memberslist!');
            } catch (error) {
                message.channel.send('Couldn\'t remove member from file. ' + error);
            }
        } else {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not a valid member!');
        }
    }
};

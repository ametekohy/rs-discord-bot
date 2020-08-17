//Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'removemember',
    description: 'Will remove the given member and his scores from the memberslist.',
    aliases: ['remove'],
    usage: '[validUserName]',

    /**
     * The display for the RemoveMember command.
     * Will verify and remove the given member and their scores from the memberslist.
     *
     * @param message - contains the discord message handler
     * @param args - the given member's name
     * @returns {Promise<void>}
     */
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

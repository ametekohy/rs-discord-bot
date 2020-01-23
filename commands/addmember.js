// Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'addmember',
    description: 'Adds a valid osrs member to the memberslist',
    aliases: ['addm'],

    /**
     * The display for the AddMember command.
     * 1. Checks if given member's name is already a member
     * 2. Checks if given member's name is a valid osrs name.
     *
     * @param message - contains the discord message handler
     * @param args - the given member's name
     * @returns {Promise<void>}
     */
    async displayAddMember(message, args) {
        const checkedArgs = checks.arguments(args);
        const isMember = checks.isMember(message, checkedArgs.officalName);
        const validUser = await checks.isValidUser(message, checkedArgs.fetchArg);

        if (!isMember) {
            if (validUser) {
                try {
                    const {services} = message.client;
                    const membersService = services.get('membersService');

                    membersService.addMember(validUser);
                    message.channel.send('The member "' + checkedArgs.officalName + '" has been added to the memberslist!');
                } catch (error) {
                    message.channel.send('Couldn\'t add member. ' + error);
                }
            } else {
                message.channel.send('The name "' + checkedArgs.officalName + '" is not a valid username on osrs!');
            }
        } else {
            message.channel.send('The name "' + checkedArgs.officalName + '" is already a member!');
        }
    }
};

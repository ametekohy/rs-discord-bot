// Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'addmember',
    description: 'Adds a valid osrs member and their scores to the memberslist.',
    aliases: ['add'],
    usage: '[validUserName]',

    /**
     * The display for the AddMember command.
     * 1. Checks if given member's name is already a member
     * 2. Checks if given member's name is a valid osrs name
     * 3a. Adds member's name to members.json
     * 3b. Adds member's scores to scores.json
     *
     * @param message - contains the discord message handler
     * @param args - the given member's name
     * @returns {Promise<void>}
     */
    async displayAddMember(message, args) {
        const checkedArgs = checks.arguments(args);
        const isAlreadyMember = checks.isAlreadyMember(message, checkedArgs.officalName);
        const validUser = await checks.isValidUser(message, checkedArgs.fetchArg);

        if (isAlreadyMember === false) {
            if (validUser) {
                try {
                    const {services} = message.client;
                    const membersService = services.get('membersService');

                    membersService.addMember(checkedArgs.officalName);
                    message.channel.send('The member "' + checkedArgs.officalName + '" has been added to the memberslist!');

                    // add the scores of new member to scoreslist
                    const scoresService = services.get('scoresService');
                    const scores = await scoresService.fetchScoresOfMember(checkedArgs.fetchArg);
                    scores.name = checkedArgs.officalName;

                    await scoresService.addScoresOfMember(scores);
                    membersService.getMembersFromFile();
                    message.channel.send('The scores of member "' + checkedArgs.officalName + '" has been added to the scoreslist!');
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

//Includes (Internal)
const checks = require('../helpers/checks');
const hiscoresView = require('../views/hiscoresView');

module.exports = {
    name: 'hiscores',
    description: 'Will display the highscores/killcount for each boss of the provided member.',
    aliases: ['hs'],
    usage: '[validUserName]',

    /**
     * The display for the "hiscores"-command.
     * Will calculate and display the hiscores of the given valid member in the memberslist.
     *
     * @param message - contains the discord message handler
     * @param args - the given member's name
     * @returns {Promise<void>}
     */
    async displayScores(message, args) {
        const checkedArgs = checks.arguments(args);
        const validUser = await checks.isAlreadyMember(message, checkedArgs.officalName);

        if(validUser !== false) {
            // Get data from services
            const {services} = message.client;
            const bossesService = services.get('bossesService');
            const bosses = bossesService.getBossesList();

            const scoresService = services.get('scoresService');
            const scores = scoresService.getScoresOfMember(validUser);

            // Join data and create display
            let hiscoresList = this.joinScoresWithBosses(bosses,scores);
            const embed = hiscoresView.createEmbed(validUser, hiscoresList);

            // Send display to discord
            await message.channel.send(embed);
        } else {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not in the memberslist!');
        }
    },

    joinScoresWithBosses(bosses, scores) {
        let hiscoresList = [];
        bosses.forEach(function (item, index) {
            hiscoresList.push({"bossname": item.name, "score": scores[index]});
        });
        return hiscoresList;
    }
};

//Includes (Internal)
const checks = require('../helpers/checks');
const top10view = require('../views/top10View');

module.exports = {
    name: 'top10',
    description: 'Will calculate and display the top 10 highest killcounts for the provided boss.',
    usage: '[validBossName]',

    /**
     * The display for the "top10"-command.
     * Will calculate and display the top 10 highest killcounts of members for the provided boss.
     *
     * @param message - contains the discord message handler
     * @param args - the given boss name
     */
    displayTop10rankingOfBoss(message, args) {
        const checkedArgs = checks.arguments(args);
        const validBoss = checks.isValidBoss(message, checkedArgs.officalName);

        if(!validBoss) {
            message.channel.send('"' + checkedArgs.officalName + '"' + ' is not a valid boss!');
        } else {
            // Construct top10 list
            const list = this.getTop10rankingOfBoss(message, validBoss.name);

            // Create display
            const embed = top10view.createEmbed(validBoss.name, validBoss.image, list);

            // Send display to discord
            message.channel.send(embed);
        }
    },

    getTop10rankingOfBoss(message, bossName) {
        // Get data from services
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bossIndex = bossesService.getBossIndex(bossName);
        const scoresService = services.get('scoresService');
        
        return scoresService.getTopScoresOfBoss(bossIndex);
    }
};

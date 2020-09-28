//Includes (Internal)
const topratingView = require('../views/toprankingView');

module.exports = {
    name: 'topranking',
    description: 'Will display a topranking of Overload; the bosses with the member who has the highest killcount for them.',
    aliases: ['top'],

    /**
     * The display for the "topranking"-command.
     * Will calculate and display the highest killcounts of each boss with the respective member and score.
     *
     * @param message - contains the discord message handler with the services
     * @returns {Promise<void>}
     */
    async displayTopScores(message) {
        // Get data from services
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bosses = bossesService.getBossesList();

        const scoresService = services.get('scoresService');
        const scores = scoresService.getScoresOfAllMembers();

        // Create display
        const embed = topratingView.createEmbed(bosses, scores.names, scores.scores);

        // Send display to discord
        await message.channel.send(embed);
    }
};

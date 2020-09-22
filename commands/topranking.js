//Includes (Internal)
const checks = require('../helpers/checks');
const topratingView = require('../views/topratingView');

module.exports = {
    name: 'topranking',
    description: '',
    aliases: ['topranking'],

    async displayTopScores(message) {
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bosses = bossesService.getBossesList();

        const scoresService = services.get('scoresService');
        const scores = scoresService.getScoresOfAllMembers();

        const embed = topratingView.createEmbed(bosses, scores.names, scores.scores);
        await message.channel.send(embed);
    }
};

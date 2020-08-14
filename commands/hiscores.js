//Includes (Internal)
const checks = require('../helpers/checks');
const hiscoresView = require('../views/hiscoresView');

module.exports = {
    name: 'hiscores',
    description: 'Will views the killcount for each boss for the provided username',
    aliases: ['hs'],
    usage: '[validUserName]',

    async displayScores(message, args) {
        const checkedArgs = checks.arguments(args);
        const validUser = await checks.isAlreadyMember(message, checkedArgs.officalName);

        if(validUser) {
            const {services} = message.client;
            const bossesService = services.get('bossesService');
            const bosses = bossesService.getBossesList();

            const scoresService = services.get('scoresService');
            const scores = scoresService.getScoresOfMember(validUser);

            let hiscoresList = this.joinScoresWithBosses(bosses,scores);
            const embed = hiscoresView.createEmbed(validUser, hiscoresList);

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

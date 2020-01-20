//Includes (Internal)
const embeds = require('../views/embeds');
const checks = require('../helpers/checks');

module.exports = {
    name: 'hiscores',
    description: 'Will views the killcount for each boss for the provided username',
    aliases: ['hs'],
    usage: '[validUserName]',

    async displayScores(message, args) {
        const checkedArgs = checks.arguments(args);
        const validUser = await checks.isMember(message, checkedArgs.officalName);

        if(!validUser) {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not in the memberslist!');
        } else {
            const {services} = message.client;
            const bossesService = services.get('bossesService');
            const bosses = bossesService.getBossesFromFile();

            const scoresService = services.get('scoresService');
            const scores = scoresService.getScoresOfMember(checkedArgs.officalName);

            let hiscoresList = [];
            bosses.forEach(function (item, index) {
                hiscoresList.push({"bossname": item.name, "score": scores[index]});
            });

            const embed = embeds.createplayerhiscore(checkedArgs.officalName, hiscoresList);
            message.channel.send(embed);
        }
    }
};

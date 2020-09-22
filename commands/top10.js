//Includes (Internal)
const checks = require('../helpers/checks');
const top10view = require('../views/top10View');

module.exports = {
    name: 'top10',
    description: 'Will calculate and display the top 10 highest killcounts of members for the provided boss.',
    usage: '[validBossName]',

    /**
     * The display for the Top10 command.
     * Will calculate and display the top 10 highest killcounts of members for the provided boss
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
            const list = this.getTop10rankingOfBoss(message, validBoss.name);
            const embed = top10view.createEmbed(validBoss.name, validBoss.image, list);
            message.channel.send(embed);
        }
    },

    getTop10rankingOfBoss(message, bossName) {
        // Loop membersList. Grab score of args boss put list. Sort high low. Display.
        const {services} = message.client;
        const membersService = services.get('membersService');
        const members = membersService.getMembersList();

        const bossesService = services.get('bossesService');
        const bossIndex = bossesService.getBossIndex(bossName);

        const scoresService = services.get('scoresService');
        const scoresList = scoresService.getScoresOfBoss(bossIndex);

        //console.log(scoresList);
        // for(let i = 0; i < members.length; i++) {
        //     list.push({name: members[i], score: scoresList[i]});
        // }


        return scoresList;//scoresList.sort(function(a, b){return b.score-a.score});
    }
};

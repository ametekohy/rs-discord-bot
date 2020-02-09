const checks = require('../helpers/checks');

module.exports = {
    name: 'ehb',
    description: 'Caculate EHB of member',

    async displayEHB(message, args) {
        var checkedArgs = checks.arguments(args);
        const validUser = await checks.isMember(message, checkedArgs.officalName);

        if(!validUser) {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not in the memberslist!');
        } else {
            var ehbList = await this.getEHB(message, validUser);

            var endresult = 0.00;
            for (var ehb of ehbList) {
                endresult += +ehb;
            }

            message.channel.send('Total EHB of ' + validUser + ' is ' + endresult.toFixed(2));
        }
    },

    async getEHB(message, checkedArgs) {
        const { services } = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesList();

        const scoresService = services.get('scoresService');
        var killcountList = await scoresService.getScoresOfMember(checkedArgs);
        var ehb = [];

        var i;
        for(i = 0; i < bossList.length; i++) {
            var ehbVar = (killcountList[i]/bossList[i].killhr).toFixed(2);
            if(isFinite(ehbVar) === false) {
                ehbVar = 0;
            }

            ehb.push(ehbVar);
        }

        return ehb;
    }
};

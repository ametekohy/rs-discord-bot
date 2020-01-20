const checks = require('../helpers/checks');

module.exports = {
    name: 'ehb',
    description: 'Caculate EHB of member',

    async displayEHB(message, args) {
        var checkedArgs = checks.arguments(args);

        var ehbList = await this.getEHB(message, checkedArgs.fetchArg);

        var endresult = 0.00;
        for(var ehb of ehbList) {
            endresult += +ehb;
        }

        message.channel.send('TOTAL EHB: ' + endresult);
    },

    async getEHB(message, checkedArgs) {
        const { services } = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesFromFile();

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

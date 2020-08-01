const checks = require('../helpers/checks');

module.exports = {
    name: 'ehb',
    description: 'Calculate EHB of member',

    async displayEHB(message, args) {
        const checkedArgs = checks.arguments(args);
        const validUser = await checks.isAlreadyMember(message, checkedArgs.officalName);

        if(validUser) {
            const ehb = await this.getEHB(message, validUser);
            message.channel.send('Total EHB of ' + validUser + ' is ' + ehb);
        } else {
            message.channel.send('The name "' + checkedArgs.officalName + '" is not in the memberslist!');
        }
    },

    async getEHB(message, checkedArgs) {
        // get data
        const { services } = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesList();

        const scoresService = services.get('scoresService');
        const killCountList = await scoresService.getScoresOfMember(checkedArgs);

        let ehb = 0.00;

        try{
            // calculate ehb and add up
            for(let i = 0; i < bossList.length; i++) {
                let ehbVar = 0.00;
                ehbVar = (killCountList[i] / bossList[i].killhr).toFixed(2);

                if(isFinite(ehbVar) === false) {
                    ehbVar = 0.00;
                }
                ehb += +ehbVar;
            }
        } catch (error) {
            message.channel.send('Couldn\'t calculate ehb. ' + error);
        }

        return ehb.toFixed(2);
    }
};

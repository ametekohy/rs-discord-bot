module.exports = {
    name: 'bosses',
    description: 'Will views a list of all available bossesList',
    aliases: ['aliases'],

    displayBosses(message) {
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesFromFile();

        let aliasString = '';
        for (let boss of bossList) {
            var amountOfSpaces = 18 - boss.alias.length;
            var spaces = '';
            for (let i = 0; i < amountOfSpaces; i++) {
                spaces += '\xa0';
            }
            aliasString += '║ ' + boss.alias + spaces + ' ║\n';
        }

        message.channel.send('```\n'
            + '╔════════════════════╗\n'
            + '║ bossname aliases   ║\n'
            + '╟────────────────────╢\n'
            + aliasString
            + '╚════════════════════╝'
            + '```'
            , {split: true});
    }
};

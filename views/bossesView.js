module.exports = {
    create: function(bossList) {
        let aliasString = '';
        for (let boss of bossList) {
            const amountOfSpaces = 18 - boss.alias.length;
            let spaces = '';
            for (let i = 0; i < amountOfSpaces; i++) {
                spaces += ' ';
            }

            aliasString += '║ ' + boss.alias + spaces + ' ║\n';
        }

       return '```'
            + '╔════════════════════╗\n'
            + '║ bossname aliases   ║\n'
            + '╟────────────────────╢\n'
            +       aliasString
            + '╚════════════════════╝'
            + '```'
            ;
    }
};

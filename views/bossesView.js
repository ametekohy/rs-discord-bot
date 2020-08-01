module.exports = {
    create: function(bossList, lastupdateddate) {
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
            + '║ Aliases of bosses  ║\n'
            + '╟────────────────────╢\n'
            +       aliasString
            + '╚════════════════════╝\n'
            + 'last updated: ' + lastupdateddate
            + '```'
            ;
    }
};

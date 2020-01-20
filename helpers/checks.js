module.exports = {
    isMember(message, args) {
        const { services } = message.client;
        const membersService = services.get('membersService');
        const members = membersService.getMembersFromFile();

        const filterName = members.find(x => x === args);
        return !!filterName;
    },

    async isValidUser(message, args) {
        const { services } = message.client;
        const scoresService = services.get('scoresService');
        let result = scoresService.fetchScoresOfMember(args);

        if(result === undefined || result === null) {
            return false;
        } else {
            return result;
        }
    },

    isValidBoss(message, args) {
        const { services } = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesFromFile();

        var filterName = bossList.find(x => x.name && x.name === args[0]);
        var filterAlias = bossList.find(x => x.alias && x.alias === args[0]);

        if(filterName !== undefined) {
            if (filterName.name === args.join(' ')) {
                return filterName;
            }
        } else if(filterAlias !== undefined) {
            if (filterAlias.alias === args[0]  ) {
                return filterAlias;
            }
        } else {
            return false;
        }
    },

    arguments(args) {
        let fetchArg = '';
        let officialName = '';
        for(let arg of args){
            fetchArg += arg + '%20';
            officialName += arg + ' ';
        }
        fetchArg = fetchArg.slice(0,-3);
        officialName = officialName.slice(0,-1);

        return { 'originalArgs': args, 'fetchArg': fetchArg , 'officalName': officialName};
    }
};

module.exports = {
    isAlreadyMember(message, args) {
        const { services } = message.client;
        const membersService = services.get('membersService');
        const members = membersService.getMembersList();

        const filterName = members.find(x => x.toLowerCase() === args.toLowerCase());

        if(filterName !== undefined) {
            return filterName;
        } else {
            return false;
        }
    },

    async isValidUser(message, args) {
        const { services } = message.client;
        const scoresService = services.get('scoresService');
        let result = await scoresService.fetchScoresOfMember(args);

        if(result === undefined || result === null || result.score === undefined || result.score.length === 0) {
            return false;
        } else {
            return result;
        }
    },

    isValidBoss(message, args) {
        const { services } = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesList();

        const filterName = bossList.find(x => x.name && x.name.toLowerCase() === args.toLowerCase());
        const filterAlias = bossList.find(x => x.alias && x.alias.toLowerCase() === args.toLowerCase());

        const suggestion = bossList.find(x => x.name.includes(args.toLowerCase()) || x.alias.includes(args.toLowerCase()));

        if(filterName !== undefined) {
            return filterName;
        } else if(filterAlias !== undefined) {
            if (filterAlias.alias === args) {
                return filterAlias;
            }
        } else if(suggestion !== undefined) {
            message.channel.send('Do you mean: ' + suggestion.name + ' (' + suggestion.alias + ')?');
            return false;
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

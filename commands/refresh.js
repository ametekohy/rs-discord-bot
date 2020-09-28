module.exports = {
    name: 'refresh',
    description: ' ',
    aliases: ['anew'],

    async displayRefresh(message) {
        // Get data from services
        const {services} = message.client;
        const membersService = services.get('membersService');
        const members = membersService.getMembersList();
        const scoresService = services.get('scoresService');

        try {
            message.channel.send('Started fetching scores of members.');

            await scoresService.fetchScores(members);
            message.channel.send('Finished fetching scores of members.')
        } catch (error) {
            message.channel.send('Couldn\'t fetch scores of members. ' + error);
        }
    }
};

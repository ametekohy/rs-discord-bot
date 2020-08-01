const bossesView = require('../views/bossesView');

module.exports = {
    name: 'bosses',
    description: 'Will views a list of all available bossesList',
    aliases: ['aliases'],

    /**
     * Returns the bosses from the json-file and setup a display and send the view to channel
     * @param message - contains the discord message handler with the services
     */
    displayBosses(message) {
        // get data from services
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesList();
        const lastUpdatedDate = bossesService.getLastUpdatedDate();

        // create display
        const displayBosses = bossesView.create(bossList, lastUpdatedDate);

        // send display to discord
        message.channel.send(displayBosses);
    }
};

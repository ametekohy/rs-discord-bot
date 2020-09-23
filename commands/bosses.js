const bossesView = require('../views/bossesView');

module.exports = {
    name: 'bosses',
    description: 'Will display a list of all available aliases of bosses.',
    aliases: ['aliases'],

    /**
     * The display for the "bosses"-command.
     * Returns the bosses from bosses.json. Setup a view and send it to the Discord channel.
     *
     * @param message - contains the discord message handler with the services
     */
    displayBosses(message) {
        // Get data from services
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesList();
        const lastUpdatedDate = bossesService.getLastUpdatedDate();

        // Create display
        const displayBosses = bossesView.create(bossList, lastUpdatedDate);

        // Send display to discord
        message.channel.send(displayBosses);
    }
};

const bossesView = require('../views/bossesView');

module.exports = {
    name: 'bosses',
    description: 'Will views a list of all available bossesList',
    aliases: ['aliases'],

    /**
     * Returns the bosslist from the file and makes & send the view
     * @param message - contains the discord message handler with the services
     */
    displayBosses(message) {
        const {services} = message.client;
        const bossesService = services.get('bossesService');
        const bossList = bossesService.getBossesList();
        const view = bossesView.create(bossList);

        message.channel.send(view);
    }
};

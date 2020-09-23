const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    description: 'Will display a random image/gif/mp4 of dogs.',
    aliases: ['doggo', 'doge'],

    /**
     * The display for the "dog"-command.
     * Fetches a json-file from https://random.dog and send the url to the Discord channel.
     *
     * @param message - contains the discord message handler
     * @returns {Promise<void>}
     */
    async displayRandomDog(message) {
        try {
            const file = await fetch('https://random.dog/woof.json').then(body => body.json());
            message.channel.send(file.url);
        } catch (error) {
            message.channel.send('Couldn\'t get dogs from api. ' + error);
        }
    }
};

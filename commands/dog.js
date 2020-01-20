const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    description: 'Will views a random image/gif/mp4 of dogs',
    aliases: ['doggo', 'doge'],

    async displayRandomDog(message) {
        try {
            const file = await fetch('https://random.dog/woof.json').then(body => body.json());
            message.channel.send(file.url);
        } catch (error) {
            message.channel.send('Couldn\'t get dogs from api. ' + error);
        }
    }
};

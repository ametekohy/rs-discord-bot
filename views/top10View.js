//Includes (External)
const Discord = require('discord.js');

//Other Variables
const color = 0x00ffff; //Cyan

module.exports = {
    createEmbed: function (bossname, thumbnail, list) {
        const top10 = new Discord.RichEmbed();
        top10.setTitle('Top 10 ' + bossname +' Killcounts');
        top10.setColor(color);
        top10.setThumbnail(thumbnail);

        //Check if list is longer than 10
        if (list.length >= 10) {
            list.length = 10;
        }

        for (let amountOfListItems = 0; amountOfListItems < list.length; amountOfListItems++) {
            top10.addField('Rank ' + (amountOfListItems+1), list[amountOfListItems].name + '\n' + list[amountOfListItems].score)
        }
        return top10;
    }
};

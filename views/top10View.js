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
        var x;
        if (list.length >= 10) {
            x = 10;
        } else {
            x = list.length
        }
        var i;
        for (i=0; i<x; i++) {
            top10.addField('Rank ' + (i+1), list[i].name + '\n' + list[i].score)
        }
        return top10;
    }
};

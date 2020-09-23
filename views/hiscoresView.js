//Includes (External)
const Discord = require('discord.js');

//Other Variables
const color = 0x00ffff; //Cyan

module.exports = {
    createEmbed: function (playername, list) {
        const hsEmbed = new Discord.RichEmbed()
            .setTitle('Hiscore of '+ playername + ':crossed_swords:')
            .setColor(color);

        let i;
        for(i = 0; i < list.length; i++) {
            let string = ':smiling_imp: ' + list[i].bossname + '\n' + ':skull: **' + list[i].score + '**\n' +
                '\n';

            if(list[i+1] !== undefined) {
                string += ':smiling_imp: ' + list[i + 1].bossname + '\n' + ':skull: **' + list[i + 1].score + '**';
            }

            hsEmbed.addField('-------------------------------',
                string
                , true);
            i++;
        }
        return hsEmbed;
    }
};

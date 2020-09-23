//Includes (External)
const Discord = require('discord.js');

//Other Variables
const color = 0x00ffff; //Cyan

module.exports = {
    createEmbed: function (bossList, nameList, scoreList) {
        const hsEmbed = new Discord.RichEmbed()
            .setTitle('Topranking of Overload')
            .setColor(color);

        let i;
        for(i = 0; i < nameList.length; i++) {
            let string =
                ':smiling_imp: ' + bossList[i].name + '\n' +
                ':crossed_swords: **' + nameList[i].toUpperCase() + '**\n' +
                ':skull: **' + scoreList[i] + '**\n' +
                '\n';

            if(bossList[i+1] !== undefined) {
                string +=
                    ':smiling_imp: ' + bossList[i+1].name + '\n' +
                    ':crossed_swords: **' +  nameList[i+1].toUpperCase() + '**\n' +
                    ':skull: **' +  scoreList[i+1] + '**\n'
            }

            hsEmbed.addField('-------------------------------',
                string
                , true);
            i++;
        }
        return hsEmbed;
    }
};

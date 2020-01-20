// includes (external)
const Discord = require('discord.js');
const bot = new  Discord.Client();
const fs = require('fs');

// includes (internal)
const config = require('./resources/config.js');

// set all commands from the command folder
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// set all models from the models folder
bot.services = new Discord.Collection();
const servicesFiles = fs.readdirSync('./models/').filter(file => file.endsWith('.js'));
for(const file of servicesFiles) {
    const service = require(`./models/${file}`);
    bot.services.set(service.name, new service);
}

// ready status when bot goes online
bot.on('ready', () => {
    let test = bot.services.get('scoresService');
    const membersService = bot.services.get('membersService');
    const members = membersService.getMembersFromFile();
    test.fetchScores(members);
    console.log('This bot is online!');
});

// handle incoming messages
bot.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    switch (command.name) {
        case 'help':
            command.displayCommands(message, args);
            break;
        case 'hiscores':
            command.displayScores(message, args);
            break;
        case 'top10':
            command.displayTop10rankingOfBoss(message, args);
            break;
        case 'bosses':
            command.displayBosses(message);
            break;
        case 'members':
            command.displayMembers(message);
            break;
        case 'addmember':
            if(checkroleisstaff(message)) {
                command.displayAddMember(message, args);
            } else {
                message.channel.send('You are not part of the Staff.')
            }
            break;
        case 'removemember':
            if(checkroleisstaff(message)) {
                command.displayRemoveMember(message, args);
            } else {
                message.channel.send('You are not part of the Staff.')
            }
            break;
        case 'dog':
            command.displayRandomDog(message);
            break;
        case 'ehb':
            command.displayEHB(message, args);
            break;
        // case 'role':
        //     command.assignrole(message, args);
        //     break;
    }
});

//Execute on discord
bot.login(config.token);

function checkroleisstaff(message) {
    // //Find role id of 'Staff'
    // role = message.guild.roles.find(r => r.name === 'Staff');
    // //Check if user has 'Staff' role
    // if (message.member.roles.has(role.id)) {
    //     return true;
    // }
    return true;
}

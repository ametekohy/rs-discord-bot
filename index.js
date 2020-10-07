// includes (external)
const schedule = require('node-schedule');

const Discord = require('discord.js');
const bot = new  Discord.Client();
const fs = require('fs');


// includes (internal)
const config = require('./resources/config');

// set all commands from the command folder
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// set all services from the services folder
bot.services = new Discord.Collection();
const servicesFiles = fs.readdirSync('./services/').filter(file => file.endsWith('.js'));
for(const file of servicesFiles) {
    const service = require(`./services/${file}`);
    bot.services.set(service.name, new service);
}

// ready status when bot goes online
bot.on('ready', () => {
    const scoresService = bot.services.get('scoresService');
    const membersService = bot.services.get('membersService');
    const members = membersService.getMembersList();

    scoresService.fetchScores(members).then(() =>
        console.log('This bot is online!')
    );

    // Recurrence rule: https://www.npmjs.com/package/node-schedule
    let rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    
    // run everyday at midnight
    schedule.scheduleJob(rule, (fireDate) => {
        console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
        scoresService.fetchScores(members).then(() => console.log('Fetching scores at midnight.'))
    })
});

// handle incoming messages
bot.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(message.guild !== null){ // If in guild
        let role = message.guild.roles.find(r => r.name === 'Staff');
        if (message.member.roles.has(role.id)) {  // If in Staff
            if(await staffCommands(command, message, args) === false) {
                await commands(command, message, args);
            }
        } else { // Not in Staff
            await commands(command, message, args);
        }
    } else { // If not in guild
        await commands(command, message, args);
    }
});

//Execute on discord
bot.login(config.token);

async function commands(command, message, args) {
    try {
        switch (command.name) {
            case 'help':
                command.displayCommands(message, args);
                break;
            case 'hiscores':
                await command.displayScores(message, args);
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
            case 'dog':
                await command.displayRandomDog(message);
                break;
            case 'ehb':
                await command.displayEHB(message, args);
                break;
            case 'topranking':
                await command.displayTopScores(message);
                break;
        }
    }catch (error) {
        await message.channel.send('Invalid command given. Try !help to see available commands.', error);
    }
}

async function staffCommands(command, message, args) {
    try {
        switch (command.name) {
            case 'addmember':
                await command.displayAddMember(message, args);
                break;
            case 'changemember':
                await command.displayChangeMember(message, args);
                break;
            case 'removemember':
                await command.displayRemoveMember(message, args);
                break;
            case 'refresh':
                await command.displayRefresh(message);
                break;
            default:
                return false;
        }
    } catch (error) {
        await message.channel.send('Invalid staff-command. Try !help to see available commands.', error);
    }
}

module.exports = {
    name: 'members',
    description: 'Will views a list of all available membersList',
    aliases: ['member'],

    displayMembers(message) {
        try {
            const {services} = message.client;
            const membersService = services.get('membersService');
            message.channel.send("Testing purpose; membersList: " + membersService.getMembersList());
            message.channel.send("There are " + membersService.getAmountOfMembers() + " members in Overload CC");
        } catch (error) {
            message.channel.send('Couldn\'t get membersList from file. ' + error);
        }
    }
};

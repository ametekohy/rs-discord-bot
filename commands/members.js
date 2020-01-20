module.exports = {
    name: 'members',
    description: 'Will views a list of all available membersList',
    aliases: ['addmember', 'removemember'],

    displayMembers(message) {
        try {
            const {services} = message.client;
            const membersService = services.get('membersService');
            message.channel.send(membersService.getMembersFromFile());
        } catch (error) {
            message.channel.send('Couldn\'t get membersList from file. ' + error);
        }
    }
};

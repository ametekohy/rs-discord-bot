module.exports = {
    name: 'members',
    description: 'Will display the amount of members in the membersList',
    aliases: ['member'],

    /**
     * The display for the "members"-command.
     * Will display the amount of members in the memberslist.
     *
     * @param message - contains the discord message handler
     */
    displayMembers(message) {
        try {
            // Get data from services
            const {services} = message.client;
            const membersService = services.get('membersService');

            // Send display to discord
            message.channel.send("There are " + membersService.getAmountOfMembers() + " members in Overload CC");
        } catch (error) {
            message.channel.send('Couldn\'t get membersList from file. ' + error);
        }
    }
};

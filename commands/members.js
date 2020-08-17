module.exports = {
    name: 'members',
    description: 'Will display the amount of members in the membersList',
    aliases: ['member'],

    /**
     * The display for the Members command.
     * Will count and display the amount of members in the memberslist.
     *
     * @param message - contains the discord message handler
     */
    displayMembers(message) {
        try {
            const {services} = message.client;
            const membersService = services.get('membersService');
            message.channel.send("There are " + membersService.getAmountOfMembers() + " members in Overload CC");
        } catch (error) {
            message.channel.send('Couldn\'t get membersList from file. ' + error);
        }
    }
};

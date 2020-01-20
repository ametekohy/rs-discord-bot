module.exports = {
    name: 'role',
    description: 'Assign role to a member',

    assignrole(message, args) {
        // Check if role exists.
        let role;
        args+='';
        if(args === 'PK' || args === 'Mass') {
            role = message.guild.roles.find(r => r.name === args);
        } else {
            role = undefined;
        }

        // Reply if role is not found. Check if role has already been assigned and remove if so. Else add role.
        if (role === undefined || role === null) {
            message.reply('Role not found, do you mean "PK" or "Mass"?');
        } else {
            if (message.member.roles.has(role.id)) {
                message.member.removeRole(role);
                message.reply('Your "' + role.name + '" role has been removed');
            } else {
                message.member.addRole(role);
                message.reply('You have been assigned the "' + role.name + '" role');
            }
        }
    },
};

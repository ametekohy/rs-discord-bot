// Includes (Internal)
const checks = require('../helpers/checks');

module.exports = {
    name: 'changemember',
    description: 'change ',
    aliases: ['change'],

    /**
     *
     * @param message
     * @param args
     * @returns {Promise<void>}
     */
    displayChangeMember(message, args) {
        var myRegexp = /[^\s"]+|"([^"]*)"/gi;
        var myString = "" + args;
        var myArray = [];

        do {
            //Each call to exec returns the next regex match as an array
            var match = myRegexp.exec(myString);
            if (match != null)
            {
                //Index 1 in the array is the captured group if it exists
                //Index 0 is the matched text, which we use if no captured group exists
                myArray.push(match[1] ? match[1] : match[0]);
            }
        } while (match != null);

        message.channel.send(myArray);
        // seperate 2 args
        // check 1e is in memberslist
        // check 2e is valid
        // const firstArgIsAlreadyMember = checks.isAlreadyMember(message, arg1);
        // const validUser = await checks.isValidUser(message, arg2);
            // change 1e name in 2e name in memberslist
            // change 1e scores in 2e scores in scores
    },

    seperateByQuotes(args) {

        args.match(/\w+|"[^"]+"/g);
        console.log(args);
    }
};

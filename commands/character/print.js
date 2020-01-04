const printCharacter = require('../../functions/print-character')
const { Command } = require('discord.js-commando')

module.exports = class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'print',
            group: 'character',
            memberName: 'print',
            description: 'prints a character sheet',
            examples: ['!print [tag] [shadowname] [type]']
        });
    }

    run(message) {
        let msglist = message.content.split(" ")

        try {

            console.log(msglist.length)
            console.log(msglist)

            // error if there are no arguments
            if (msglist.length == 1) {
                throw error

            // if there is one argument, it needs to be only shadowname.
            } else if (msglist.length == 2) {

                // printCharacter will check if it's a valid shadowname.
                printCharacter(message, msglist[1], "all")

            // if there are two arguments, there are two valid possibilities.
            } else if (msglist.length == 3) {

                // first option: [tag] [shadowname]
                // check for this by checking for tag formatting in the first argument.
                if (msglist[1].slice(0, 3) == "<@!") {
                    printCharacter(message, msglist[1], "all")

                // second option: [shadowname] [type]
                // printCharacter has checking built in for this one.
                } else {
                    printCharacter(message, msglist[1], msglist[2])
                }

            // if there are three arguments, it must be all three.
            } else if (msglist.length == 4) {
                printCharacter(message, msglist[2], msglist[3])
            } else {
                throw error
            }


            // catch errors
        } catch (err) {
            message.reply("There was an error - probably with your formatting. Try again!")
        }
    }
};

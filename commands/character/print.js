const { Command } = require('discord.js-commando')
const printBeats = require('../../functions/print-beats')
const printXP = require('../../functions/print-xp')
const printCharacter = require('../../functions/print-character')
const lists = require('../../utils/const-character')

module.exports = class PrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'print',
            group: 'character',
            memberName: 'print',
            description: 'prints character information',
            examples: [ '!print (cs|character|sheet) [tag] shadowname [scope]',
                        '!print beats [tag] shadowname [number]',
                        '!print xp-spends [tag] shadowname [number]',
                        '!print xp [tag] shadowname']
        });
    }

    run(message) {
        let msglist = message.content.toLowerCase().split(" ")
        let shadowname = ''
        let userid = message.author.id
        let type = 'all'

        console.log(msglist)

        try {

            // error if there are no arguments
            if (msglist.length < 3) {
                throw 'Not enough arguments!'

            // if there is one argument, it needs to be only shadowname.
            } else if (msglist.length == 3) {
                shadowname = msglist[2]

            // if there are two arguments, there are two valid possibilities.
            } else if (msglist.length == 4) {

                // first option: [tag] [shadowname]
                // check for this by checking for tag formatting in the first argument.
                if (msglist[2].slice(0, 3) == "<@!") {
                    userid = msglist[2]
                    shadowname = msglist[3]

                // second option: [shadowname] [type]
                } else {
                    shadowname = msglist[2]
                    type = msglist[3]
                }

            // if there are three arguments, it must be all three.
            } else if (msglist.length == 5) {
                userid = msglist[2]
                shadowname = msglist[3]
                type = msglist[4]

            // more arguments gets an error
            } else {
                throw 'Too many arguments!'
            }

            // format the userid to just get the id number
            userid = userid.replace('<','').replace('>','').replace('@', '').replace('!','')

            //check for a valid type
            if (!Number.isInteger(parseInt(type)) && !lists.validTypes.includes(type)) {
                throw 'Invalid type!'
            }

            // print character sheet
            if (msglist[1] == 'cs' || msglist[1] == 'sheet' || msglist[1] == 'character') {
                printCharacter(message, userid, shadowname, type)

            // print beats
            } else if (msglist[1] == 'beats' || msglist[1] == 'beat') {
                if (type == 'all') {
                    type = 5
                }
                printBeats(message, userid, shadowname, 'last', parseInt(type), 'beats')

            // print xp spends
            } else if (msglist[1] == 'xp-spends' || msglist[1] == 'xp-spend') {
                if (type == 'all') {
                    type = 5
                }
                printBeats(message, userid, shadowname, 'last', parseInt(type), 'xp-spends')

            // print total xp
            } else if (msglist[1] == 'xp') {
                printXP(message, userid, shadowname)
            }

        // catch errors
        } catch (err) {
            let errormsg = "Error: " + err + '\n' +
                        "Try the following:" +
                        '```\n' +
                        '!print (cs|character|sheet) [tag] shadowname [scope]\n' +
                        '!print beats [tag] shadowname [number]\n' +
                        '!print xp-spends [tag] shadowname [number]\n' +
                        '!print xp [tag] shadowname\n' +
                        '```\n'+
                        "Valid scopes:\n" +
                        '```\n' +
                        lists.validTypes +
                        '```\n'
            message.reply(errormsg)
        }
    }
};

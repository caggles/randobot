const MongoClient = require('mongodb').MongoClient
const { Command } = require('discord.js-commando')
const printXP = require('../../functions/print-xp')
require('dotenv').config()

module.exports = class XPPrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xp-total',
            group: 'archive',
            memberName: 'xp-total',
            description: 'prints total xp earned and spent',
            examples: ['`!xp-total [shadow-name]`'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {shadow_name}) {
        printXP(message, message.author.id, shadow_name)

    }
}

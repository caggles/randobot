const { Command } = require('discord.js-commando')
const printBeats = require('../../functions/print-beats')
require('dotenv').config()

module.exports = class XPSpendsPrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'print-xp-spends',
            group: 'archive',
            memberName: 'print-xp-spends',
            description: 'prints recent xp spends',
            examples: ['`!print-xp-spends [shadow-name] x` to print the x most recent xp spends.'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'number',
                    prompt: 'How many spends do you want to view?',
                    type: 'integer'
                },
            ]
        });
    }

    run(message, {shadow_name, number}) {
        printBeats(message, message.author.id, shadow_name, 'last', number, 'xp-spends')
    }
}

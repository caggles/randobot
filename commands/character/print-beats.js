const { Command } = require('discord.js-commando')
const printBeats = require('../../functions/print-beats')
require('dotenv').config()

module.exports = class BeatPrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'print-beats',
            group: 'character',
            memberName: 'print-beats',
            description: 'prints recent beats',
            examples: ['`!print-beats [shadow-name] x` to print the x most recent beats.'],
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
        printBeats(message, shadow_name, 'last', number, 'beats')
    }
}

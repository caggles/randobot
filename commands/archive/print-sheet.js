const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printCharacter = require('../../functions/print-character')
require('dotenv').config()

module.exports = class CharacterPrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'print-sheet',
            group: 'archive',
            memberName: 'print-sheet',
            description: 'prints a character sheet',
            examples: ['`!print-sheet [shadowname]` to have the bot print your character sheet.'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'type',
                    prompt: 'What information do you want to see? (attributes, skills, arcana, merits, base, all)',
                    type: 'string',
                    oneOf: ['arcana', 'attributes', 'attribute', 'skill', 'skills', 'merit', 'merits', 'base', 'all']
                },
            ]
        });
    }

    run(message, {shadow_name, type}) {

        //add an 's' to the end of these types if the user didn't provide it.
        if (type.toLowerCase() == 'attribute' || type.toLowerCase() == 'skill' || type.toLowerCase() == 'merit') {
            type += 's'
        }

        printCharacter(message, message.author.id, shadow_name, type)
    }
}

const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printCharacter = require('../../functions/print-character')
require('dotenv').config()

module.exports = class CharacterPrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'print-sheet',
            group: 'character',
            memberName: 'print-sheet',
            description: 'prints a character sheet',
            examples: ['`!print-sheet [shadowname]` to have the bot print your character sheet.'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
            ]
        });
    }

    run(message, {shadow_name}) {
        printCharacter(message, shadow_name)
    }
}
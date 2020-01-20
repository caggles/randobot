const { Command } = require('discord.js-commando')
const damageDealt = require('../../functions/damage')

module.exports = class DamageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'damage',
            group: 'character',
            memberName: 'damage',
            description: 'damage character',
            examples: [],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'type',
                    prompt: 'What type of damage is it? (agg, lethal, bashing)',
                    type: 'string',
                    oneOf: ['a', 'l', 'b', 'agg', 'lethal', 'bash', 'aggravated', 'bashing']
                },
                {
                    key: 'number',
                    prompt: 'How much damage is it?',
                    type: 'string',

                }
            ]
        });
    }

    run(message, { shadow_name, number, type }) {
        shadow_name = shadow_name.toString().toLowerCase().trim()
        type = type.toString().toLowerCase().trim().charAt(0)
        number = parseInt(number)
        damageDealt(message, shadow_name, number, type)
    }
}
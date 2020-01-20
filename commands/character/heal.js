const { Command } = require('discord.js-commando')
const damageHealed = require('../../functions/heal')

module.exports = class HealCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'heal',
            group: 'character',
            memberName: 'heal',
            description: 'heal character',
            examples: [],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'type',
                    prompt: 'What type of healing is it? (agg, lethal, bashing, rez)',
                    type: 'string',
                    oneOf: ['a', 'l', 'b', 'agg', 'lethal', 'bash', 'aggravated', 'bashing', 'rez', 'resurrect', 'res', 'r']
                },
                {
                    key: 'number',
                    prompt: 'How much damage is it?',
                    type: 'string',
                    required: false
                }
            ]
        });
    }

    run(message, { shadow_name, number, type }) {
        shadow_name = shadow_name.toString().toLowerCase().trim()
        type = type.toString().toLowerCase().trim().charAt(0)
        number = parseInt(number)
        damageHealed(message, shadow_name, number, type)
    }
}
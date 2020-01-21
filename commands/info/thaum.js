const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
require('../../functions/capitalize')
const magic = require('../../utils/const-thaumaturgy')


module.exports = class CreativeThaumaturgyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'thaum',
            group: 'info',
            memberName: 'thaum',
            description: 'see the effects of an arcanum and practice when paired together',
            examples: [ '`!thaum [arcanum] [practice]`'],
            args: [
                {
                    key: 'arcanum',
                    prompt: 'What is the arcanum in question?',
                    type: 'string',
                    oneOf: ['fate', 'time', 'mind', 'space', 'prime', 'forces', 'spirit', 'life', 'death', 'matter']
                },
                {
                    key: 'practice',
                    prompt: 'What is the practice in question?',
                    type: 'string',
                    oneOf: ['compelling', 'knowing', 'unveiling', 'ruling', 'shielding', 'veiling', 'fraying', 'perfecting', 'weaving', 'patterning', 'unraveling', 'making', 'unmaking']
                }
            ]
        });
    }

    run(message, {arcanum, practice}) {
        let title = ''
        var details = ''
        var color = 0xFFFFFF

        try {

            let practiceInfo = magic.practices[practice]
            let useString = ''

            if (practiceInfo.uses.length > 0) {
                for (let spell of practiceInfo.uses) {
                    useString += purviewReplace(spell, arcanum) + '\n'
                }
            }


            const embedMessage = new Discord.RichEmbed()
                .setTitle(practice.capitalize() + " " + arcanum.capitalize())
                .setColor(color)
                .addField('Level', practiceInfo.level, false)
                .addField('Effect', purviewReplace(practiceInfo.definition, arcanum), false)
                .addField('Spell Mechanics', useString);
            message.embed(embedMessage);

        } catch (err) {
            title = "error"
            details = "something went wrong!\n`" + err + "`"
            const embedMessage = new Discord.RichEmbed()
                .setTitle(title)
                .setColor(0xFF0000)
                .setDescription(details);
            message.embed(embedMessage);
        }
    }
}

function purviewReplace(string, arcanum) {

    let purviewList = string
    let purviews = ''

    if (string.includes('[')) {
        purviewList = string.toString().split('[')[1].split(']')[0].split(',')
        for (let purviewType of purviewList) {
            console.log(magic.arcana[arcanum][purviewType])
            purviews += magic.arcana[arcanum][purviewType] + ', '
        }
        purviews = purviews.substring(0, purviews.length-2)
        string = string.replace('[' + purviewList.join(', ') + ']', purviews)
    }

    return string
}

const { Client, RichEmbed } = require('discord.js');

module.exports = message => {
    let msgtext = '\n**Rolling CoD Dice**\n'
    msgtext += '`!roll X` to roll a standard pool of X dice.\n'
    msgtext += '`!roll X Yagain` or `!roll X Ya` to roll a pool of X dice with Y-agains.\n'
    msgtext += 'add `$message` to the end of your roll to include the purpose or pool for your roll.\n'
    msgtext += 'example: !roll 5 9a $wits+comp` to roll 5 dice with 9-agains for a wits and composure roll.\n'
    msgtext += '\n**Drawing Tarot Cards**\n'
    msgtext += '`!tarot X` to draw X tarot cards, with both upright and reverse options.'
    message.reply(msgtext)
}
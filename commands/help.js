const { Client, RichEmbed } = require('discord.js');

module.exports = message => {
    let msgtext = 'here is the help you requested: \n\n**Rolling CoD Dice**\n'
    msgtext += '`!roll X` to roll a standard pool of X dice.\n'
    msgtext += '`!roll X Yagain` or `!roll X Ya` to roll a pool of X dice with Y-agains.\n'
    msgtext += 'add `$message` to the end of your roll to include the purpose or pool for your roll.\n'
    msgtext += 'example: `!roll 5 9a $wits+comp` to roll 5 dice with 9-agains for a wits and composure roll.\n'
    msgtext += '\n**Drawing Tarot Cards**\n'
    msgtext += '`!tarot draw X` to draw X tarot cards, with both upright and reverse results.\n'
    msgtext += '`!tarot draw X d` to include additional details about the cards you draw.\n'
    msgtext += '`!tarot lookup $cardname` to lookup the meanings of a specific card.'
    message.reply(msgtext)
}

const roll_dice = require('../commands/roll_dice')
const help = require('../commands/help')
const tarot_draw = require('../commands/tarot_draw')
const tarot_lookup = require('../commands/tarot_lookup')

module.exports = (client, message) => {
  let msglist = message.content.split(" ")

  if (msglist[0] === '!roll') {
    return roll_dice(message)
  }

  if (msglist[0] === '!tarot') {
    if (msglist[1] === 'draw') {
      return tarot_draw(message)
    }
    else if (msglist[1] === 'lookup') {
      return tarot_lookup(message)
    }
  }

  if (message.content === '!help') {
    return help(message)
  }
}

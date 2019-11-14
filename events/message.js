const roll = require('../commands/roll_dice')
const help = require('../commands/help')
const tarot = require('../commands/tarot')

module.exports = (client, message) => {
  let msglist = message.content.split(" ")

  if (msglist[0] === '!roll') {
    return roll(message)
  }

  if (msglist[0] === '!tarot') {
    return tarot(message)
  }

  if (message.content === '!help') {
    return help(message)
  }
}

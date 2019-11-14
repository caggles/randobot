const ping = require('../commands/ping')
const roll = require('../commands/roll_dice')

module.exports = (client, message) => {
  if (message.content === 'ping') {
    return ping(message)
  }
}

module.exports = (client, message) => {
  var msglist = message.content.split(" ")
  if (msglist[0] === '!roll') {
    return roll(message)
  }
}

const { Client, RichEmbed } = require('discord.js');
const request = require('request');

module.exports = message => {
    let card_no = message.content.split(" ")[1]
    let color = 0xFFFFFF

    return request('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=' + card_no, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        for (i = 0; i < card_no; i++) {
            let card = body['cards'][i]
            let orientation = Math.ceil(Math.random() * 2)
            switch (card['suit']) {
                case 'cups':
                    color = 0x0066CC
                    break;
                case 'pentacles':
                    color = 0xFFCC00
                    break;
                case 'swords':
                    color = 0x990000
                    break;
                case 'wands':
                    color = 0x006633
                    break;
                default:
                    color = 0xFFFFFF
                    break;
            }
            let details = '**Description**\n' + card['desc']
            let name = card['name']

            if (orientation == 2) {
                name += " (Reversed)"
                details += '\n\n**Meaning (Reversed)**\n' + card['meaning_rev']
            }
            else {
                name += " (Upright)"
                details += '\n\n**Meaning (Upright)**\n' + card['meaning_up']
            }

            const embed = new RichEmbed()
                .setTitle(name)
                .setColor(color)
                .setDescription(details);
            message.channel.send(embed);
        }
    });

  }
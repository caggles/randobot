const { Client, RichEmbed } = require('discord.js');
const request = require('request');

module.exports = message => {
    let title = ''
    var details = ''
    var card = ''
    var color = 0xFFFFFF
    try {
        let card_name = message.content.split("$")[1].toLowerCase().split(" ")
        if (card_name[1] == "of") {
            let card_value = card_name[0]
            var card_suit = card_name[2]
            if (card_value.length != 2) {
                card_value = '0' + card_value
            }
            var card_shortname = card_suit.substring(0, 2) + card_value

        } else {
            card_shortname = 'ar01'
        }
        request('https://rws-cards-api.herokuapp.com/api/v1/cards/' + card_shortname, {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            card = body['card']
            switch (card_suit) {
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
            details = '**Meaning (Upright)**\n' + card['meaning_up'] + '\n\n**Meaning (Reversed)**\n' + card['meaning_rev']
            title = card['name']
            const embed = new RichEmbed()
                .setTitle(title)
                .setColor(color)
                .setDescription(details);
            message.channel.send(embed);
        });
    } catch (err){
        title = "error"
        details = "something went wrong: " + err + "\ndid you use the correct lookup format? \,`!tarot lookup $value of suit`"
        const embed = new RichEmbed()
            .setTitle(title)
            .setColor(0xFF0000)
            .setDescription(details);
        message.channel.send(embed);
    }

}

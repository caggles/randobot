const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const isNumeric = require("isnumeric");

module.exports = class TarotLookupCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tarot-lookup',
            group: 'tarot',
            memberName: 'lookup',
            description: 'lookup tarot cards',
            examples: [ '`!tarot-lookup $cardname` to draw 3 tarot cards with keyword information.']
        });
    }

    run(message) {
        let title = ''
        var details = ''
        var color = 0xFFFFFF

        try {
            let card_name = message.content.split("$")[1].toLowerCase().trim()
            console.log(card_name[0, 3])
            if (card_name.substring(0, 4) == 'the ') {
                card_name = card_name.substring(4, card_name.length)
            }
            console.log(card_name)
            const uri = "mongodb://randobot:" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_NAME + "?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db(process.env.MONGO_NAME).collection("tarot");
                let query = {name_lower: card_name}
                if (isNumeric(card_name[0])) {
                    query = {value_num: parseInt(card_name.split(" of ")[0]), suit: card_name.split(" of ")[1]}
                }
                let card_promise = collection.findOne(query)
                console.log(card_promise)
                console.log(query)
                card_promise.then(function (card) {
                    console.log(card)
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

                    let meaning_up = card['meaning_up']
                    let meaning_rev = card['meaning_rev']
                    let links = card['biddy_link'] + '\n' + card['labyrinthos_link']

                    if (meaning_up.length > 1024) {
                        meaning_up = meaning_up.substring(0, 1024)
                        let last_period = meaning_up.lastIndexOf('.')
                        meaning_up = meaning_up.substring(0, last_period + 1)
                    }
                    if (meaning_rev.length > 1024) {
                        meaning_rev = meaning_rev.substring(0, 1024)
                        let last_period = meaning_rev.lastIndexOf('.')
                        meaning_rev = meaning_rev.substring(0, last_period + 1)
                    }

                    const embedMessage = new Discord.RichEmbed()
                        .setTitle(card['name'])
                        .setColor(color)
                        .addField('Meaning (Upright)', meaning_up, false)
                        .addField('Meaning (Reversed)', meaning_rev, false)
                        .addField('Keywords (Upright)', card['keyword_up'], true)
                        .addField('Keywords (Reversed)', card['keyword_rev'], true)
                        .addField('Further Information', links)
                        .setImage(card['rws_image']);
                    message.embed(embedMessage);

                });
                client.close();
            });
        } catch (err) {
            title = "error"
            details = "something went wrong!\n`" + err + "`\n\nDid you use the correct lookup format? \n`!tarot-lookup $value of suit`"
            const embedMessage = new Discord.RichEmbed()
                .setTitle(title)
                .setColor(0xFF0000)
                .setDescription(details);
            message.embed(embedMessage);
        }
    }
}

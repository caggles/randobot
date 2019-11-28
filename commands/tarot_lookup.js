const { Client, RichEmbed } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const isNumeric = require("isnumeric");

module.exports = message => {
    let title = ''
    var details = ''
    var color = 0xFFFFFF

    try {
        let card_name = message.content.split("$")[1].toLowerCase().trim()
        console.log(card_name[0,3])
        if (card_name.substring(0,4) == 'the ') {
            card_name = card_name.substring(4, card_name.length)
        }
        console.log(card_name)
        const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser: true});
        client.connect(err => {
            const collection = client.db("randobot").collection("tarot");
            let query = { name_lower: card_name}
            if (isNumeric(card_name[0])) {
                query = { value_num: parseInt(card_name.split(" of ")[0]), suit: card_name.split(" of ")[1]}
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


                if (details.length > 2048) {
                    details = details.substring(0, 2048)
                    let last_period = details.lastIndexOf('.')
                    details = details.substring(0, last_period)
                }

                const embed = new RichEmbed()
                    .setTitle(card['name'])
                    .setColor(color)
                    .addField('Meaning (Upright)', card['meaning_up'], true)
                    .addField('Meaning (Reversed)', card['meaning_rev'], true)
                    .setImage(card['image']);
                message.channel.send(embed);

            });
            client.close();
        });
    } catch (err){
        title = "error"
        details = "something went wrong!\n`" + err + "`\n\nDid you use the correct lookup format? \n`!tarot lookup $value of suit`"
        const embed = new RichEmbed()
            .setTitle(title)
            .setColor(0xFF0000)
            .setDescription(details);
        message.channel.send(embed);
    }

    // try {
    //     let card_name = message.content.split("$")[1].toLowerCase().split(" ")
    //     if (card_name[1] == "of") {
    //         let card_value = card_name[0]
    //         var card_suit = card_name[2]
    //         if (card_value.length != 2) {
    //             card_value = '0' + card_value
    //         }
    //         var card_shortname = card_suit.substring(0, 2) + card_value
    //
    //     } else {
    //         card_shortname = 'ar01'
    //     }
    //     request('https://rws-cards-api.herokuapp.com/api/v1/cards/' + card_shortname, {json: true}, (err, res, body) => {
    //         if (err) {
    //             return console.log(err);
    //         }
    //         card = body['card']
    //         switch (card_suit) {
    //             case 'cups':
    //                 color = 0x0066CC
    //                 break;
    //             case 'pentacles':
    //                 color = 0xFFCC00
    //                 break;
    //             case 'swords':
    //                 color = 0x990000
    //                 break;
    //             case 'wands':
    //                 color = 0x006633
    //                 break;
    //             default:
    //                 color = 0xFFFFFF
    //                 break;
    //         }
    //         details = '**Meaning (Upright)**\n' + card['meaning_up'] + '\n\n**Meaning (Reversed)**\n' + card['meaning_rev']
    //         title = card['name']
    //         const embed = new RichEmbed()
    //             .setTitle(title)
    //             .setColor(color)
    //             .setDescription(details);
    //         message.channel.send(embed);
    //     });
    // } catch (err){
    //     title = "error"
    //     details = "something went wrong: " + err + "\ndid you use the correct lookup format? \,`!tarot lookup $value of suit`"
    //     const embed = new RichEmbed()
    //         .setTitle(title)
    //         .setColor(0xFF0000)
    //         .setDescription(details);
    //     message.channel.send(embed);
    // }

}

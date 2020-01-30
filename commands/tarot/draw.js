const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

module.exports = class TarotDrawCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tarot-draw',
            group: 'tarot',
            memberName: 'draw',
            description: 'draws tarot cards',
            examples: [ '`!tarot-draw 3` to draw 3 tarot cards with keyword information.',
                        '`!tarot-draw 4 d` to draw 4 tarot cards with more detailed meaning information.'],
            args: [
                    {
                        key: 'card_no',
                        prompt: 'How many cards do you want to draw?',
                        type: 'integer',
                    },
                    {
                        key: 'detailflag',
                        prompt: 'Do you want it to be detailed?',
                        type: 'string',
                        default: ''
                    },
            ]
        });
    }

    run(message, { card_no, detailflag }) {
        let color = 0xFFFFFF
        let detailed = false
        if (detailflag.toLowerCase() == 'd') {
            detailed = true
        }

        const uri = "mongodb://randobot:" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_NAME + "?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser: true});
        client.connect(err => {
            const collection = client.db("randobot").collection("tarot");
            console.log('start loop')
            for (let i = 0; i < card_no; i++) {
                console.log('loop ' + i)
                let draw_no = Math.floor(Math.random() * 78)
                let orientation = Math.ceil(Math.random() * 2)
                let card_promise = collection.find().limit(1).skip(draw_no).toArray()
                console.log(card_promise)
                card_promise.then(function (card_array) {
                    let card = card_array[0]
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

                    let title = ''
                    let details = '**Meaning**\n'
                    let keywords = ''
                    let links = card['biddy_link'] + '\n' + card['labyrinthos_link']

                    if (orientation == 2) {
                        title = card['name'] + ' (Reversed)'
                        details += card['meaning_rev']
                        keywords = card['keyword_rev']
                    } else {
                        title = card['name'] + ' (Upright)'
                        details += card['meaning_up']
                        keywords = card['keyword_up']
                    }


                    if (details.length > 2048) {
                        details = details.substring(0, 2047)
                        let last_period = details.lastIndexOf('.')
                        details = details.substring(0, last_period + 1)
                    }

                    const embedMessage = new Discord.RichEmbed()
                        .setTitle(title)
                        .setColor(color)
                        .setThumbnail(card['rws_image'])
                        .addField('Keywords', keywords);
                    if (detailed) {
                        embedMessage
                            .setDescription(details)
                            .addField('Further Information', links);
                    }

                    message.embed(embedMessage);

                });
            }
            client.close();
        });

    }
}

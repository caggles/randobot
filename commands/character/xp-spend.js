const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printBeats = require('../../functions/print-beats')
require('../../functions/capitalize')
const lists = require('../../utils/const-character')
require('dotenv').config()

module.exports = class CharacterCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xp-spend',
            group: 'character',
            memberName: 'xp-spend',
            description: 'spend xp for your CoD character',
            examples: ['`!xp-spend [shadow_name] [amount]` to spend xp'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'amount',
                    prompt: "how many xp are you spending?",
                    type: 'integer'
                },
                {
                    key: 'description',
                    prompt: 'Provide a short description of the xp spend',
                    type: 'string'
                }
            ]
        });
    }

    run(message, {shadow_name, amount, description}) {
        try {

            //connect to the "xp-spends" collection
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("xp-spends");

                let spend =
                    {   'user': message.author.username,
                        'userid': message.author.id,
                        'shadow_name': shadow_name.toLowerCase(),
                        'amount': amount,
                        'datetime': Date.now(),
                        'description': description
                    }

                //add the xp spend
                let spend_promise = collection.insertOne(spend)
                spend_promise.then(function () {

                    //prints the beat
                    message.say('xp spent!')

                })
                .catch(function (err) {
                    message.reply('Error:' + err)
                });
            });
        } catch (err) {
            message.reply('' + err)
        }
    }
}

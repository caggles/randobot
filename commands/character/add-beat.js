const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printBeats = require('../../functions/print-beats')
require('../../functions/capitalize')
require('./update-stat')
const lists = require('../../utils/const-character')
require('dotenv').config()

module.exports = class CharacterCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'beat+',
            group: 'character',
            memberName: 'beat+',
            description: 'add a beat to your CoD character',
            examples: ['`!beat+ [shadow_name]` to add a beat to your character'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'description',
                    prompt: 'Provide a short description of the reason you obtained the beat (no need to include date information - that will be recorded automatically).',
                    type: 'string'
                }
            ]
        });
    }

    run(message, {shadow_name, description}) {
        try {

            //connect to the "character" collection
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("beats");

                let beat =
                    {   'user': message.author.username,
                        'userid': message.author.id,
                        'shadow_name': shadow_name.toLowerCase(),
                        'datetime': Date.now(),
                        'description': description
                    }

                //add the beat
                let beat_promise = collection.insertOne(beat)
                beat_promise.then(function () {

                    //prints the beat
                    printBeats(message, shadow_name, 'last', 1, 'beats')

                })
                .catch(function (err) {
                    message.reply(err)
                });
            });
        } catch (err) {
            message.reply('' + err)
        }
    }
}

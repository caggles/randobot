const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printCharacter = require('../../functions/print-character')
require('../../functions/capitalize')
const lists = require('../../utils/const-character')
require('dotenv').config()

module.exports = class UpdateStatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'update-stat',
            group: 'character',
            memberName: 'update-stat',
            description: 'update stats of a CoD character',
            examples: ['`!update-stat [stat-type] [stat=name] [value]` to update a particular stat',
                '`!update-stat` to have the bot prompt you for the information necessary to update a character stat.'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'type',
                    prompt: 'What type of stat are you are updating? (attributes, skills, arcana, merits, base)',
                    type: 'string',
                    oneOf: ['arcana', 'attributes', 'attribute', 'skill', 'skills', 'merit', 'merits', 'base']
                },
                {
                    key: 'name',
                    prompt: 'What is the name of the stat you are updating?',
                    type: 'string'
                },
                {
                    key: 'value',
                    prompt: 'What is the new value of this stat?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {shadow_name, type, name, value}) {
        try {

            name = name.toString().toLowerCase().trim()
            type = type.toString().toLowerCase().trim()
            value = value.toString().toLowerCase().trim()

            //add an 's' to the end of these types if the user didn't provide it.
            if (type.toLowerCase() === 'attribute' || type.toLowerCase() === 'skill' || type.toLowerCase() === 'merit') {
                type += 's'
            }

            //check for the validity of the stat name, to avoid accidentally adding a new stat called "investigate".
            // TODO: add a stat dictionary so "investigate" automatically swaps to "investigation", etc.
            if (type === 'attributes' && !(lists.attribute_names.includes(name.capitalize()))) {
                throw Error ('That is not a valid attribute name!')
            }
            if (type === 'skills' && !(lists.skill_names.includes(name.capitalize()))) {
                throw Error ('That is not a valid skill name!')
            }
            if (type === 'arcana' && !(lists.arcana_names.includes(name.capitalize()))) {
                throw Error ('That is not a valid arcanum name!')
            }


            //connect to the "character" collection
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("characters");

                //query against the given shadow name and the user's ID, to make sure nobody can edit another person's character.
                let query = {shadow_name: shadow_name.toLowerCase(), userid: message.author.id}

                //set up the name of the field to be updated
                let field = type + '.' + name
                if (type == "base") {
                    field = name
                }
                let update = { $set: { [field] : value} }
                if (type == 'merits' && value == 0) {
                    update = { $unset: { [field] : value } }
                }

                //update the document
                let update_promise = collection.findOneAndUpdate(query, update)
                update_promise.then(function (character) {

                    //print the new character sheet with update info.
                    let print_promise = printCharacter(message, character["value"]["shadow_name"], type)
                    print_promise.then(function () {
                        message.say("Don't forget to update your `!xp-spend` for this change!")
                    })
                        .catch(function (err) {
                            message.reply('Error: ' + err)
                        })

                })
                .catch(function (err) {
                    message.reply('Error: ' + err)
                });
            });
        } catch (err) {
            message.reply('Error: ' + err)
        }
    }
}

const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printCharacter = require('../../functions/print-character')
require('dotenv').config()

const attribute_names = ['Intelligence', 'Strength', 'Presence', 'Wits', 'Dexterity', 'Manipulation', 'Resolve', 'Stamina', 'Composure']
const skill_names = ['Academics', 'Athletics', 'Animal Ken', 'Computers', 'Brawl', 'Empathy', 'Crafts', 'Drive',
    'Expression', 'Investigation', 'Firearms', 'Intimidation', 'Medicine', 'Larceny', 'Persuasion', 'Occult', 'Stealth',
    'Socialize', 'Politics', 'Survival', 'Streetwise', 'Science', 'Weaponry', 'Subterfuge']

module.exports = class CharacterCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'update-stat',
            group: 'character',
            memberName: 'update-stat',
            description: 'update stats of a CoD character',
            examples: ['`!update-stat [stat-type] [stat=name] [value]` to update a particular stat',
                '`!update-stat` to have the bot prompt you for the base stats of your new Mage character.'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'type',
                    prompt: 'What type of stat are you are updating?',
                    type: 'string',
                    oneOf: ['attributes', 'attribute', 'skill', 'skills']
                },
                {
                    key: 'name',
                    prompt: 'What is the name of the stat you are updating?',
                    type: 'string'
                },
                {
                    key: 'value',
                    prompt: 'What is the new value of this stat?',
                    type: 'integer'
                }
            ]
        });
    }

    run(message, {shadow_name, type, name, value}) {
        try {

            if (type.toLowerCase() == 'attribute' || type.toLowerCase() == 'skill') {
                type += 's'
            }
            if (type == 'attributes' && !attribute_names.includes(capitalize(name))) {
                throw Error ('That is not a valid attribute name!')
            }
            if (type == 'skills' && !skill_names.includes(capitalize(name))) {
                throw Error ('That is not a valid skill name!')
            }

            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("characters");
                let query = {shadow_name: shadow_name}
                let field = type + '.' + name
                let update = { $set: { [field] : value} }
                let create_promise = collection.findOneAndUpdate(query, update)
                create_promise.then(function (character) {
                    console.log(character)
                    return printCharacter(message, character["value"]["shadow_name"])
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

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
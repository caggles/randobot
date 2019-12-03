const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const MongoClient = require('mongodb').MongoClient
const printCharacter = require('../../functions/print-character')
require('dotenv').config()

module.exports = class CharacterCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'create-character',
            group: 'character',
            memberName: 'create-character',
            description: 'create a base CoD character',
            examples: ['`!create-character` to have the bot prompt you for the base stats of your new Mage character.'],
            args: [
                {
                    key: 'character_name',
                    prompt: 'What is your character\'s name?',
                    type: 'string'
                },
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                },
                {
                    key: 'path',
                    prompt: 'What is your character\'s Path?',
                    type: 'string'
                },
                {
                    key: 'virtue',
                    prompt: 'Virtue?',
                    type: 'string'
                },
                {
                    key: 'vice',
                    prompt: 'Vice?',
                    type: 'string'
                },
            ]
        });
    }

    run(message, {character_name, shadow_name, path, virtue, vice}) {
        try {
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("characters");
                let character =
                    {   'user': message.author.username,
                        'userid': message.author.id,
                        'character_name': character_name,
                        'shadow_name': shadow_name,
                        'path': path,
                        'virtue': virtue,
                        'vice': vice,
                        attributes: {
                            'intelligence': 2,
                            'wits': 2,
                            'resolve': 2,
                            'strength': 2,
                            'dexterity': 2,
                            'stamina': 2,
                            'presence': 2,
                            'manipulation': 2,
                            'composure': 2
                        },
                        skills: {
                            'academics': 0,
                            'athletics': 0,
                            'animal_ken': 0,
                            'computers': 0,
                            'brawl': 0,
                            'empathy': 0,
                            'crafts': 0,
                            'drive': 0,
                            'expression': 0,
                            'investigate': 0,
                            'firearms': 0,
                            'intimidation': 0,
                            'medicine': 0,
                            'larceny': 0,
                            'persuasion': 0,
                            'occult': 0,
                            'stealth': 0,
                            'socialize': 0,
                            'politics': 0,
                            'survival': 0,
                            'streetwise': 0,
                            'science': 0,
                            'weaponry': 0,
                            'subterfuge': 0
                        }
                    }
                let create_promise = collection.insertOne(character)
                create_promise.then(function (character) {
                    return printCharacter(message, character["ops"][0]["shadow_name"])
                })
                .catch(function (err) {
                    if (err["code"] == '11000'){
                        message.reply("You already have a character with that Shadow Name! Are you trying to edit that character?")
                    } else {
                        message.reply("Error: " + err)
                    }
                });
            });
        } catch (err) {
            message.say("Error: " + err)
        }
    }
}
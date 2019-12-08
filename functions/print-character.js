const MongoClient = require('mongodb').MongoClient
const capitalize = require('./capitalize')
const lists = require('../utils/const-character')
require('dotenv').config()


module.exports = function printCharacter(message, shadow_name, scope) {
    return new Promise((resolve, reject) => {
        try {

            //connect to the "characters" collection
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("characters");

                //query for the character by shadow name and user (this is unique)
                let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': message.author.id}
                let get_promise = collection.findOne(query)
                get_promise.then(function (character) {

                    if (character == null) {
                        message.reply("that character doesn't exist.")
                        reject(err)
                    } else {

                        //print the base stats if the scope is appropriate
                        if (scope == 'base' || scope == 'all') {
                            let base_stats = '----\n**' + character["shadow_name"].capitalize() + '**\n```\n' +
                                'Path: ' + character["path"].capitalize() + '\n' +
                                'Order: ' + character["order"].capitalize() + '\n' +
                                'Virtue: ' + character["virtue"].capitalize() + '\n' +
                                'Vice: ' + character["vice"].capitalize() + '\n' +
                                '```----'
                            message.say(base_stats)
                        }

                        //print attributes if the scope is appropriate
                        if (scope == 'attributes' || scope == 'all') {
                            generateStatBlock(message, 'Attributes', lists.attribute_names, character, 3)
                        }

                        //print attributes if the scope is appropriate
                        if (scope == 'skills' || scope == 'all') {
                            generateStatBlock(message, 'Skills', lists.skill_names, character, 3)
                        }

                        //print merits if the scope is appropriate
                        if (scope == 'merits' || scope == 'all') {
                            let merit_names = []
                            for (let merit_name in character["merits"]) {
                                merit_names.push(merit_name)
                            }
                            let columns = 1
                            if (merit_names.length > 5) {
                                columns = 2
                            } else if (merit_names.length > 8) {
                                columns = 3
                            }
                            generateStatBlock(message, 'Merits', merit_names, character, columns)
                        }

                        //print arcana if the scope is appropriate
                        if (scope == 'arcana' || scope == 'all') {
                            generateStatBlock(message, 'Arcana', lists.arcana_names, character, 2)
                        }

                        resolve(null);
                    }
                });
            });
        } catch (err) {
            message.reply("Error: " + err);
            reject(err);
        }
    });
}

function generateStatBlock (message, stat_type, stat_list, character, columns) {
    let statblock = stat_type + '\n' + '```'
    for (let i = 0; i < stat_list.length; i++) {
        let current_stat = stat_list[i]
        let letters = current_stat.length
        let spaces = 15 - letters
        if (i % columns == 0) {
            statblock += '\n'
        }
        for (let j = 0; j < spaces; j++) {
            statblock += ' '
        }
        statblock += current_stat.capitalize() + ' - '

        for (let i = 0; i < 5; i++) {
            if (i < character[stat_type.toLowerCase()][current_stat.toLowerCase()]) {
                statblock += '●'
            } else {
                statblock += 'o'
            }
        }
    }
    statblock += '```----'
    statblock = statblock.replace('``````', '```\nnone\n```')
    message.say(statblock)
}

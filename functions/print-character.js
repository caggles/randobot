const MongoClient = require('mongodb').MongoClient
const capitalize = require('./capitalize')
const lists = require('../utils/const-character')
require('dotenv').config()


module.exports = function printCharacter(message, userid, shadow_name, scope) {
    return new Promise((resolve, reject) => {
        try {

            //connect to the "characters" collection
            const uri = process.env.MONGO_URI
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db(process.env.MONGO_NAME).collection("characters");

                userid = userid.replace('<','').replace('>','').replace('@', '').replace('!','')

                //query for the character by shadow name and user (this is unique)
                let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': userid}
                let get_promise = collection.findOne(query)
                get_promise.then(function (character) {

                    if (character == null) {
                        message.reply("that character doesn't exist.")
                        reject(err)
                    } else {

                        //print the base stats if the scope is appropriate
                        if (scope == 'base' || scope == 'all') {
                            let base_stats = '----\n**' + character["shadow_name"].capitalize() + '**\n'
                            message.say(base_stats)
                            generateWordBlock(message, '', lists.base_names, character, 3)
                        }

                        //print attributes if the scope is appropriate
                        if (scope == 'attributes' || scope == 'all') {
                            generateStatBlock(message, 'Attributes', lists.attribute_names, character, 3)
                        }

                        //print attributes if the scope is appropriate
                        if (scope == 'skills' || scope == 'all') {
                            generateStatBlock(message, 'Skills', lists.skill_names, character, 3)
                            let spec_names = []
                            for (let spec_name in character["specs"]) {
                                spec_names.push(spec_name)
                            }
                            generateWordBlock(message, 'Specs', spec_names, character, 1)
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

                        //print health if the scope is appropriate
                        if (scope == 'health' || scope == 'consumable' || scope == 'all') {
                            let healthblock = 'Health\n' + '```'
                            let health_boxes = parseInt(character['attributes']['stamina']) + 5
                            let total_health = parseInt(character['consumable']['health']['a']) + parseInt(character['consumable']['health']['l']) + parseInt(character['consumable']['health']['b'])
                            for (let i = 0; i < character['consumable']['health']['a']; i++) {
                                healthblock += '⦿'
                            }
                            for (let i = 0; i < character['consumable']['health']['l']; i++) {
                                healthblock += '⊗'
                            }
                            for (let i = 0; i < character['consumable']['health']['b']; i++) {
                                healthblock += '⊘'
                            }
                            for (let i = 0; i < (health_boxes - total_health); i++) {
                                healthblock += '◯'
                            }
                            healthblock += '```'
                            if ((health_boxes - total_health) < 3) {
                                healthblock += 'You are sufficiently damaged to suffer a -' + (3 - (health_boxes - total_health)) + ' penalty to all dice pools.\n'
                            }
                            if (health_boxes == total_health) {
                                healthblock += 'You are concussed. Your next turn will begin with a stamina roll to avoid passing out.\n'
                                if (character['consumable']['health']['b'] == 0) {
                                    healthblock += 'You are bleeding out. Your next turn will begin by taking an additional 1 lethal damage.\n'
                                }
                            }
                            healthblock += '----'
                            if (character['consumable']['health']['dead']) {
                                healthblock = "**YOU ARE DEAD**\n\n:("
                            }
                            message.say(healthblock)
                        }

                        if (scope == 'willpower' || scope == 'consumable' || scope == 'all') {
                            let wpblock = 'Willpower\n' + '```'
                            for (let i = 0; i < (parseInt(character['attributes']['resolve']) + parseInt(character['attributes']['composure'])); i++) {
                                if (i < character['consumable']['willpower']) {
                                    wpblock += '⊠'
                                } else {
                                    wpblock += '⊡'
                                }
                            }
                            wpblock += '```----'
                            message.say(wpblock)
                        }

                        if (scope == 'mana' || scope == 'consumable' || scope == 'all') {
                            let manablock = 'Mana\n' + '```'
                            for (let i = 0; i < lists.totalMana[character['gnosis']]; i++) {
                                if (i < character['consumable']['mana']) {
                                    manablock += '⊠'
                                } else {
                                    manablock += '⊡'
                                }
                            }
                            manablock += '```----'
                            manablock = manablock.replace('``````', '```\nnone\n```')
                            message.say(manablock)
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

function generateWordBlock (message, stat_type, stat_list, character, columns) {
    let wordblock = stat_type + '\n' + '```'
    for (let i = 0; i < stat_list.length; i++) {
        let current_stat = stat_list[i]
        let letters = current_stat.length
        let spaces = 15 - letters
        if (i % columns == 0) {
            wordblock += '\n'
        }
        for (let j = 0; j < spaces; j++) {
            wordblock += ' '
        }
        if (stat_type == '') {
            wordblock += current_stat.capitalize() + ' - ' + character[current_stat.toLowerCase()].capitalize()
            letters = character[current_stat.toLowerCase()].length
            spaces = 15 - letters
        } else {
            wordblock += current_stat.capitalize() + ' - ' + character[stat_type.toLowerCase()][current_stat.toLowerCase()].capitalize()
            letters = character[stat_type.toLowerCase()][current_stat.toLowerCase()].length
            spaces = 15 - letters
        }
        for (let j = 0; j < spaces; j++) {
            wordblock += ' '
        }


    }
    wordblock += '```----'
    wordblock = wordblock.replace('``````', '```\nnone\n```')
    message.say(wordblock)
}

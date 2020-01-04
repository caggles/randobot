const printCharacter = require('./print-character')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

module.exports = async function damageDealt(message, shadow_name, number, type) {
    return new Promise((resolve, reject) => {
        try {

            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection("characters");

                //query against the given shadow name and the user's ID, to make sure nobody can edit another person's character.
                let query = {shadow_name: shadow_name.toLowerCase(), userid: message.author.id}
                let get_promise = collection.findOne(query)
                get_promise.then(function (character) {

                    let current_health = character.consumable.health
                    let health_boxes = parseInt(character.attributes.stamina) + 5
                    let bla_health = current_health.a + current_health.l + current_health.b
                    let la_health = current_health.a + current_health.l
                    let a_health = current_health.a

                    if (bla_health + number <= health_boxes) {
                        current_health[type] += number
                    } else {
                        // if the damage starts as bashing, start here and bashing to any missing boxes.
                        // then, the remaining type of damage to be applied changes to lethal and the amount of
                        // damage is less what's already been applied.
                        if (type == 'b') {
                            console.log('bashing damage')
                            let diff = health_boxes - bla_health
                            console.log('diff = ' + diff)
                            console.log('number = ' + number)
                            if (number <= diff) {
                                current_health['b'] += number
                            } else {
                                console.log('bashing will roll over')
                                current_health['b'] += diff
                                number -= diff
                                type = 'l'
                            }
                        }

                        console.log(' ')

                        //repeat for lethal
                        if (type == 'l') {
                            console.log('lethal damage')
                            let l_diff = health_boxes - la_health
                            let b_diff = health_boxes - bla_health
                            console.log('diff = ' + l_diff)
                            console.log('number = ' + number)
                            if (number <= l_diff) {
                                current_health['l'] += number
                                current_health['b'] -= (number - b_diff)
                            } else {
                                console.log('lethal will roll over')
                                current_health['l'] += l_diff
                                current_health['b'] -= l_diff
                                if (current_health['b'] < 0) {
                                    current_health['b'] = 0
                                }
                                number -= l_diff
                                type = 'a'
                            }
                        }

                        console.log(' ')

                        //repeat for agg
                        if (type == 'a') {
                            console.log('agg damage')
                            let a_diff = health_boxes - a_health
                            let l_diff = health_boxes - la_health
                            let b_diff = health_boxes - bla_health
                            console.log('diff = ' + a_diff)
                            console.log('number = ' + number)
                            if (number <= a_diff) {
                                current_health['a'] += number
                                current_health['l'] -= (number - l_diff)
                            } else {
                                current_health['a'] += a_diff
                                current_health['l'] = 0
                                current_health['b'] = 0
                                current_health.dead = true
                            }
                        }
                    }

                    let update = { $set: {'consumable.health' : current_health} }
                    let update_promise = collection.findOneAndUpdate(query, update)
                    update_promise.then(function (character) {
                        printCharacter(message, message.author.id, shadow_name, 'health')
                    });
                });
            });
        } catch (err) {
            message.reply("Error: " + err)
            reject(err);
        }
    });
}
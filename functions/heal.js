const printCharacter = require('./print-character')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

module.exports = async function damageHealed(message, shadow_name, number, type) {
    return new Promise((resolve, reject) => {
        try {

            const uri = "mongodb://randobot:" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_URL + "/" + process.env.MONGO_NAME + "?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db(process.env.MONGO_NAME).collection("characters");

                //query against the given shadow name and the user's ID, to make sure nobody can edit another person's character.
                let query = {shadow_name: shadow_name.toLowerCase(), userid: message.author.id}
                let get_promise = collection.findOne(query)
                get_promise.then(function (character) {

                    let current_health = character.consumable.health

                    if (type == 'r') {
                        current_health['dead'] = false
                    } else {
                        current_health[type] -= number
                        if (current_health[type] < 0) {
                            current_health[type] = 0
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

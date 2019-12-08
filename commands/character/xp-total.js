const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const { Command } = require('discord.js-commando')
const printBeats = require('../../functions/print-beats')
require('dotenv').config()

module.exports = class XPPrintCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xp-total',
            group: 'character',
            memberName: 'xp-total',
            description: 'prints total xp earned and spent',
            examples: ['`!xp-total [shadow-name]`'],
            args: [
                {
                    key: 'shadow_name',
                    prompt: 'What is your character\'s shadow name?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {shadow_name, number}) {

        try {

            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});

            //connect to the "characters" collection
            client.connect(err => {
                const collection = client.db("randobot").collection("characters");

                //query for the character by shadow name and user (this is unique)
                let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': message.author.id}
                let get_promise = collection.findOne(query)
                get_promise.then(function (character) {

                    //get starting xp for the character
                    let starting_xp = character['xp']

                    //connect to the "beats" collection
                    client.connect(err => {
                        const collection = client.db("randobot").collection("beats");

                        //query for a count of beats by shadow name and user
                        let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': message.author.id}
                        collection.aggregate(
                            [ { '$match': query }, { '$group': { '_id': null, 'count': { '$sum': 1 } } }],
                        function(err, cursor) {
                            assert.equal(err, null);
                            cursor.toArray(function(err, documents) {
                                console.log(documents)
                                let earned_xp = Math.floor(documents[0]["count"]/5);
                                let beats = documents[0]["count"]%5;
                                console.log(earned_xp)

                                 //connect to the "xp-spends" collection
                                client.connect(err => {
                                    const collection = client.db("randobot").collection("xp-spends");

                                    //query for a count of the total xp spent by shadow name and user
                                    let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': message.author.id}
                                    collection.aggregate(
                                      [ { '$match': query }, { '$group': { '_id': null, 'totalAmount': { '$sum': '$amount' } } }],
                                    function(err, cursor) {
                                        assert.equal(err, null);
                                        cursor.toArray(function(err, documents) {
                                            let totalXP = starting_xp + earned_xp
                                            message.reply("\nTotal XP Earned: " + totalXP + "\nTotal XP Spent: " + documents[0]["totalAmount"] + "\nBeats Remaining: " + beats)
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

        } catch (err) {
            message.reply("Error: " + err);
        }


    }
}

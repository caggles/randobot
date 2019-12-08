const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


module.exports = async function printBeats(message, shadow_name, scope, number, type) {
    return new Promise((resolve, reject) => {
        try {

            //connect to the correct collection
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection(type);

                //build 'last' type query
                let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': message.author.id}
                let get_promise = collection.find(query).sort({ $natural: -1 }).limit(number).toArray(function(err, beats_list) {
                    if (err) throw err;
                    let msg = '**' + type.capitalize() + '**\n'
                     beats_list.forEach(function(beat){
                         let d = new Date(beat['datetime'])
                         msg += '`' + d.toLocaleString() + '  -  ' + beat['description'] + '`\n'
                      });
                    message.say(msg);
                    resolve(null);

                });
            });
        } catch (err) {
            message.reply("Error: " + err)
            reject(err);
        }
    });
}

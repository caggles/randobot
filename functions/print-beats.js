const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


module.exports = async function printBeats(message, userid, shadow_name, scope, number, type) {
    return new Promise((resolve, reject) => {
        try {

            //connect to the correct collection
            const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("randobot").collection(type);

                //build 'last' type query
                let query = {'shadow_name': shadow_name.toLowerCase(), 'userid': userid}
                let get_promise = collection.find(query).sort({$natural: -1}).limit(number).toArray(function (err, beats_list) {
                    if (err) throw err;
                    let beatstring = ''
                    beats_list.forEach(function (beat) {
                        let d = new Date(beat['datetime'])
                        beatstring += '`' + d.toLocaleString() + '  -  ' + beat['description'] + '`\n'
                    });
                    if (beatstring == '') {
                        message.reply("there are no " + type + " for this character. Did you provide the right shadow name?")
                        reject(err)
                    } else{
                        message.say('**' + type.capitalize() + '**\n' + beatstring);
                        resolve(null);
                    }

                });
            });

        } catch (err) {
            message.reply("Error: " + err)
            reject(err);
        }
    });
}

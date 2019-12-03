const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const attribute_names = ['Intelligence', 'Strength', 'Presence', 'Wits', 'Dexterity', 'Manipulation', 'Resolve', 'Stamina', 'Composure']
const skill_names = ['Academics', 'Athletics', 'Animal Ken', 'Computers', 'Brawl', 'Empathy', 'Crafts', 'Drive',
    'Expression', 'Investigation', 'Firearms', 'Intimidation', 'Medicine', 'Larceny', 'Persuasion', 'Occult', 'Stealth',
    'Socialize', 'Politics', 'Survival', 'Streetwise', 'Science', 'Weaponry', 'Subterfuge']

module.exports = async function printCharacter(message, shadow_name) {
    try {
        const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser: true});
        client.connect(err => {
            const collection = client.db("randobot").collection("characters");
            let query = {'shadow_name': shadow_name}
            let get_promise = collection.findOne(query)
            get_promise.then(function (character) {
                let base_stats = '----\n**' + character["shadow_name"] + '**\n```\n' +
                    'Path: ' + character["path"] + '\n' +
                    'Virtue: ' + character["virtue"] + '\n' +
                    'Vice: ' + character["virtue"] + '\n' +
                    '```----'
                message.say(base_stats)
                generateStatBlock(message, 'Attributes', attribute_names, character)
                generateStatBlock(message, 'Skills', skill_names, character)
            });
        });
    } catch (err) {
        message.reply("Error: " + err)
    }
    return true;
}

function generateStatBlock (message, stat_type, stat_list, character) {
    let statblock = stat_type + '\n' + '```'
    for (let i = 0; i < stat_list.length; i++) {
        let current_stat = stat_list[i]
        let letters = current_stat.length
        let spaces = 15 - letters
        if (i % 3 == 0) {
            statblock += '\n'
        }
        for (let j = 0; j < spaces; j++) {
            statblock += ' '
        }
        statblock += current_stat + ' - '
        for (let i = 0; i < 5; i++) {
            if (i < character[stat_type.toLowerCase()][current_stat.toLowerCase()]) {
                statblock += '●'
            } else {
                statblock += 'o'
            }
        }
    }
    statblock += '```----'
    message.say(statblock)
}
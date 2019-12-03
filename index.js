require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
//const client = new Discord.Client()
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');

const client = new Commando.Client({
    commandPrefix: '!',
    owner: '99536096764899328'
});

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['dice', 'Dice Commands'],
        ['tarot', 'Tarot Commands']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

// fs.readdir('./events/', (err, files) => {})
//
// fs.readdir('./events/', (err, files) => {
//   files.forEach(file => {
//     const eventHandler = require(`./events/${file}`)
//   })
// })
//
// fs.readdir('./events/', (err, files) => {
//   files.forEach(file => {
//     const eventHandler = require(`./events/${file}`)
//     const eventName = file.split('.')[0]
//     client.on(eventName, (...args) => eventHandler(client, ...args))
//   })
// })

module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`)
   client.user.setActivity('!help')
}

client.login(process.env.BOT_TOKEN);

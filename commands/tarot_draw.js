const { Client, RichEmbed } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

module.exports = message => {
    let card_no = message.content.split(" ")[2]
    let color = 0xFFFFFF
    let detailed = false
    if (message.content.split(" ").length > 3 && message.content.split(" ")[3][0].toLowerCase() == 'd') {
        detailed = true
    }

    const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("randobot").collection("tarot");
      for (i = 0; i < card_no; i++) {
          let draw_no = Math.floor(Math.random() * 78)
          let orientation = Math.ceil(Math.random() * 2)
          let card_promise = collection.find().limit(1).skip(draw_no).toArray()
          console.log(card_promise)
          card_promise.then(function(card_array){
              card = card_array[0]
              console.log(card)
              switch (card['suit']) {
                  case 'cups':
                      color = 0x0066CC
                      break;
                  case 'pentacles':
                      color = 0xFFCC00
                      break;
                  case 'swords':
                      color = 0x990000
                      break;
                  case 'wands':
                      color = 0x006633
                      break;
                  default:
                      color = 0xFFFFFF
                      break;
              }

              let title = ''
              let details = '**Meaning**\n'
              let keywords = ''
              let links = card['biddy_link'] + '\n' + card['labyrinthos_link']

              if (orientation == 2) {
                  title = card['name'] + ' (Reversed)'
                  details += card['meaning_rev']
                  keywords = card['keyword_rev']
              } else {
                  title = card['name'] + ' (Upright)'
                  details += card['meaning_up']
                  keywords = card['keyword_up']
              }


              if (details.length > 2048) {
                  details = details.substring(0,2047)
                  let last_period = details.lastIndexOf('.')
                  details = details.substring(0, last_period)
              }

              const embed = new RichEmbed()
                  .setTitle(title)
                  .setColor(color)
                  .setThumbnail(card['rws_image'])
                  .addField('Keywords', keywords);
              if (detailed) {
                  embed
                    .setDescription(details)
                    .addField('Further Information', links);
              }

              message.channel.send(embed);

          });
      }
      client.close();
    });

  }

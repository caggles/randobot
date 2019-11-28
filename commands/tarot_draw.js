const { Client, RichEmbed } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

module.exports = message => {
    let card_no = message.content.split(" ")[2]
    let color = 0xFFFFFF

    const orientation = {
        1: {title: "Upright", body_ref: "meaning_up"},
        2: {title: "Reversed", body_ref: "meaning_rev"}
    }
    const uri = "mongodb+srv://randobot:" + process.env.MONGO_PASSWORD + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("randobot").collection("tarot");
      for (i = 0; i < card_no; i++) {
          let draw_no = Math.floor(Math.random() * 78)
          let flip = Math.ceil(Math.random() * 2)
          let card_promise = collection.find().limit(1).skip(draw_no).toArray()
          console.log(card_promise)
          card_promise.then(function(card_array){
              card = card_array[0]
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

              // if (details.length > 2048) {
              //     details = details.substring(0,2048)
              //     let last_period = details.lastIndexOf('.')
              //     details = details.substring(0, last_period)
              // }

              const embed = new RichEmbed()
                  .setTitle(name = card['name'])
                  .setColor(color)
                  .addField(orientation[flip]['title'], card[orientation[flip]['body_ref']], true)
                  .setImage(card['image']);
              message.channel.send(embed);

          });
      }
      client.close();
    });

  }

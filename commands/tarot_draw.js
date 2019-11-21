const { Client, RichEmbed } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;

module.exports = message => {
    let card_no = message.content.split(" ")[2]
    let color = 0xFFFFFF

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
              switch (card['type']) {
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
              let details = ''
              let name = card['name']

              if (orientation == 2) {
                  name += " (Reversed)"
                  details += '**Meaning (Reversed)**\n' + card['meaning_rev']
              }
              else {
                  name += " (Upright)"
                  details += '**Meaning (Upright)**\n' + card['meaning_up']
              }

              if (details.length > 2048) {
                  details = details.substring(0,2048)
                  let last_period = details.lastIndexOf('.')
                  details = details.substring(0, last_period)
              }

              const embed = new RichEmbed()
                  .setTitle(name)
                  .setColor(color)
                  .setDescription(details)
                  .setThumbnail(card['image']);
              message.channel.send(embed);

          });
      }
      client.close();
    });


    // return request('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=' + card_no, { json: true }, (err, res, body) => {
    //     if (err) { return console.log(err); }
    //     for (i = 0; i < card_no; i++) {
    //         let card = body['cards'][i]
    //         let orientation = Math.ceil(Math.random() * 2)
    //         switch (card['suit']) {
    //             case 'cups':
    //                 color = 0x0066CC
    //                 break;
    //             case 'pentacles':
    //                 color = 0xFFCC00
    //                 break;
    //             case 'swords':
    //                 color = 0x990000
    //                 break;
    //             case 'wands':
    //                 color = 0x006633
    //                 break;
    //             default:
    //                 color = 0xFFFFFF
    //                 break;
    //         }
    //         let details = ''
    //         let name = card['name']
    //
    //         if (orientation == 2) {
    //             name += " (Reversed)"
    //             details += '**Meaning (Reversed)**\n' + card['meaning_rev']
    //         }
    //         else {
    //             name += " (Upright)"
    //             details += '**Meaning (Upright)**\n' + card['meaning_up']
    //         }
    //
    //         details += '\n\n**Description**\n' + card['desc']
    //         if (details.length > 2048) {
    //             details = details.substring(0,2048)
    //             let last_period = details.lastIndexOf('.')
    //             details = details.substring(0, last_period)
    //         }
    //
    //         const embed = new RichEmbed()
    //             .setTitle(name)
    //             .setColor(color)
    //             .setDescription(details);
    //         message.channel.send(embed);
    //     }
    // });

  }

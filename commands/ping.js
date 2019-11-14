const { Client, RichEmbed } = require('discord.js');

module.exports = message => {
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('a response to ping')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Pong!!');
    // Send the embed to the same channel as the message
    message.channel.send(embed);
}

#!/usr/bin/env node

let date = new Date().toISOString().slice(0, 10);
console.log("discord bot started on " + date);

const discord = require("discord.js");
require('dotenv').config();
const client = new discord.Client;
const guildId = '594578956209094666';

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
}

client.on('ready', async () => {
  console.log(`Logged in as MOOBOT#6155!`);
  const commands = await getApp(guildId).commands.get();
  await getApp(guildId).commands.post({
    data: {
      name: 'ping',
      description: 'Ping command'
    },
  });

  await getApp(guildId).commands.post({
    data: {
      name: 'join-beta',
      description: 'Join the beta testing program'
    },
  });

  await getApp(guildId).commands.post({
    data: {
      name: 'old-games',
      description: 'Get access to my old games'
    },
  });
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const command = interaction.data.name.toLowerCase();
  console.log(command);
  if (command == 'ping') {
    reply(interaction, 'pong');
  }
  if (command == 'join-beta') {
    reply(interaction, 'Sorry, There is no active beta program.');
    //reply(interaction, "Thanks for joining the beta program.\nhttps://drive.google.com/file/d/1n7EC_7L-FCXT6MhrrsxuwWb3QOgUCVyA/view?usp=sharing");
  }
  if (command == 'old-games') {
    reply(interaction, '<https://freezestudios.itch.io/lets-play-simulator> \n<https://freezestudios.itch.io/something-in-the-shadows> \n<https://freezestudios.itch.io/endless> \n<https://freezestudios.itch.io/the-apartment> \n<https://freezestudios.itch.io/the-apartment-3> \n<https://freezestudios.itch.io/stairwell-2-hell> \n<https://freezestudios.itch.io/hq-dark-web>');
  }
});

const reply = (interaction, response) => {
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: response
      }
    }
  })
}

client.login(process.env.BOT_TOKEN);

client.on('guildMemberAdd', member => {
  //const channel = member.guild.channels.get('594587939938238474');
  //channel.send(`Hey ${member}, welcome to SERVER.exe :tada: <:surprised_pikachu:644282592656621578> !`);
  console.log(`${member.displayName} joined`);
});

client.on("guildMemberRemove", (member) => {
  console.log(`${member.displayName} left`);
});
const { Client, GatewayIntentBits } = require("discord.js");

// Intents를 GatewayIntentBits를 사용하여 지정
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const token = process.env.DISCORD_BOT_SECRET;

client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on('messageCreate', (msg) => {
  if (msg.author.id !== client.user.id) {
    console.log("messageCreate");
    console.log("msg.author.id",msg.author.id);
    console.log("client.user.id",client.user.id);
    console.log("msg", msg);
    //msg.channel.send(msg.content.split('').reverse().join(''));
    //msg.
  }
});

client.login(token);

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

// const { Client, GatewayIntentBits } = require("discord.js");

// Create a new client instance
// Intents를 GatewayIntentBits를 사용하여 지정
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const token = process.env.DISCORD_BOT_SECRET;

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
  console.log(`${client.user.username} is Ready! Logged in as ${readyClient.user.tag}`);
  // 봇이 속한 모든 채널에 메시지 보내기
  client.channels.cache.forEach(channel => {
    console.log('❗channel',channel);
    if (channel.type === 0) { // 텍스트 채널인 경우에만
      channel.send(`안녕하세요! ${client.user.username}이(가) ${channel.name} 채널에 온라인 상태입니다.${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`)
        .then(() => console.log(`메시지가 ${channel.name} 채널에 성공적으로 전송되었습니다.`))
        .catch(error => console.error(`메시지를 ${channel.name} 채널에 전송하는 중 오류가 발생했습니다:`, error));
    }
  });
});

client.on('messageCreate', (msg) => {
  //봇체크
  if (msg.author.bot) return;
  if (msg.author.id !== client.user.id) {
    //console.log("msg", msg);
    msg.channel.send(msg.content.split('').reverse().join(''));
  }
});

// Log in to Discord with your client's token
client.login(token);




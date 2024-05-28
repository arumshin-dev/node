const express = require('express');
const { Client, Events, GatewayIntentBits } = require('discord.js');

const app = express();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const token = process.env.DISCORD_BOT_SECRET;

// 클라이언트에게 로봇 켜기 요청 처리
app.get('/startRobot', (req, res) => {
  client.login(token)
    .then(() => {
      res.sendStatus(200); // 성공 상태 코드 전송
    })
    .catch(err => {
      console.error('로봇 켜는 중 에러 발생:', err);
      res.sendStatus(500); // 서버 오류 상태 코드 전송
    });
});

// Discord 클라이언트 이벤트 처리
client.once(Events.ClientReady, readyClient => {
  console.log(`${client.user.username} is Ready! Logged in as ${readyClient.user.tag}`);
  // 봇이 속한 모든 채널에 메시지 보내기
  client.channels.cache.forEach(channel => {
    console.log('❗channel', channel);
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
    msg.channel.send(msg.content.split('').reverse().join(''));
  }
});

module.exports = app;

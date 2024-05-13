const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static('public'));
// 정적 파일 제공을 위한 middleware 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 경로("/")로 접속했을 때 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/processData', (req, res) => {
  // 클라이언트로부터의 요청을 처리하는 로직
  console.log("데이터 처리 중...");
  res.send("데이터가 처리되었습니다.");
});

// app.listen(3000, () => {
//   console.log('서버가 포트 3000에서 실행 중입니다.');
// });
// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});





const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const noticeRouter = require('./routes/notice');
const freeBoardRouter = require('./routes/free_board');

const app = express();
const port = 3000;

// EJS를 뷰 엔진으로 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일을 제공하기 위해 public 디렉터리 설정
app.use(express.static(path.join(__dirname, 'public')));

// body-parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 라우터 설정
app.use('/notice', noticeRouter);
app.use('/free', freeBoardRouter);

// 루트 경로 핸들러
app.get('/', (req, res) => {
    res.redirect('/notice');
});

// 서버 실행
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

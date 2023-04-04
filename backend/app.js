const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');

const postRouter = require("./routes/post");
const postsRouter = require('./routes/posts');
const userRouter = require("./routes/user");
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync().then(() => {console.log('db연결 성공!')}).catch(console.error);
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use('/', express.static(path.join(__dirname, 'uploads'))); // '/'는 localhost:3065/ 일 때
// 프론트에서는 서버쪽 폴더구조를 몰라서 보안에 이점이 있다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3060', 'http://reacttwitter.shop', 'http://3.35.188.1'],
  credentials: true,
}));
app.use(cookieParser(process.env.SECRET_KEY)); // 쿠키문자열을 객체로 만들어주는 역할
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // 스크립트 공격 방어 (XSS)
    sameSite: 'none',
    secure: true,
    domain: process.env.NODE_ENV === 'production' && '.reacttwitter.shop' // 옛날 브라우저들 때문에 .을 앞에 붙여줬다.
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
  res.send("index");
});

app.get('/', (req,res) => {
  res.send("api server");
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

// app.use((err, req, res, next) => {

// }) 에러처리미들웨어가 내부적으로 존재한다.

app.listen(80, () => {
  console.log("서버 실행중");
})
require("dotenv").config();
const express = require("express"); // express 모듈
const path = require("path"); // 경로 설정 모듈
const morgan = require("morgan"); // morgan(로그) 모듈
const session = require("express-session"); // 세션 모듈
const cors = require("cors"); // cors 모듈
let corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const passport = require("passport"); // 패스포트 모듈
const passportConfig = require("./passport"); // 패스포트 설정 (자체)
passportConfig();

const apiRouter = require("./routes"); // 라우터 경로 설정 (자체)
// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require("./models");
// 서버 실행 시 MySQL과 연동
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(
  cors(corsOptions),
  morgan("dev"),
  express.static(path.join(__dirname, "public")),
  express.json(),
  express.urlencoded({ extended: false }),
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
  passport.initialize(),
  passport.session()
);

app.use("/api", apiRouter);

// 일부러 에러 발생시키기 TEST용 (not found)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message,
  });
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

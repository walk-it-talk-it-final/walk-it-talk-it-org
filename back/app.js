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

const fs = require("fs");
// 업로드 폴더 생성
try {
  fs.readdirSync("public/uploads");
} catch (err) {
  console.error("uploads 폴더가 없어서 생성합니다.");
  fs.mkdirSync("public/uploads");
}

const passport = require("passport"); // 패스포트 모듈
const passportConfig = require("./passport"); // 패스포트 설정 (자체)
passportConfig();

const apiRouter = require("./routes"); // 라우터 경로 설정 (자체)
// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require("./models");

app.set("port", process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); // 로그
app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱

// 일부러 에러 발생시키기 TEST용 (not found)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  // 템플릿 변수 설정
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체

  res.status(err.status || 500);
  res.render("error"); // 템플릿 엔진을 렌더링 하여 응답
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

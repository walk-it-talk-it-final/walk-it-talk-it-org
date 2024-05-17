const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// 회원가입
exports.join = async (req, res, next) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(req.body);
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      throw new Error("이미 가입된 이메일입니다.");
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hash,
    });
    res.json({
      code: 200,
      message: "회원가입이 완료되었습니다.",
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.createToken = async (req, res, next) => {
  try {
    // passport.authenticate('local') 미들웨어 실행
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      } else if (!user) {
        throw new Error(info.message);
      }
      // 정상 로그인
      return req.login(user, (err) => {
        const accessToken = jwt.sign(
          { id: user.id, nickname: user.nickname },
          process.env.JWT_SECRET,
          { expiresIn: "1h", issuer: "mini_project", subject: "accessToken" }
        );

        const refreshToken = jwt.sign(
          { id: user.id, nickname: user.nickname },
          process.env.JWT_SECRET,
          { expiresIn: "7d", issuer: "mini_project", subject: "refreshToken" }
        );
        User.update({ refreshToken }, { where: { id: user.id } });
        if (err) {
          console.error(err);
          return next(err);
        }

        res.json({
          code: 200,
          message: "토큰이 발급되었습니다.",
          accessToken,
          userId: user.id,
        });
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const accessResult = jwt.decode(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: accessResult.id } });
    const refreshResult = jwt.verify(user.refreshToken, process.env.JWT_SECRET);
    if (accessResult.id !== refreshResult.id) {
      throw new Error("토큰이 일치하지 않습니다.");
    }

    const newAccessToken = jwt.sign(
      { id: accessResult.id, nickname: accessResult.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "1h", issuer: "mini_project", subject: "accessToken" }
    );

    res.json({
      code: 200,
      message: "새로운 토큰이 발급되었습니다.",
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.kakaoLogin = async (req, res, next) => {
  try {
    passport.authenticate("kakao", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw new Error(info.message);
      }
      return req.login(user, (err) => {
        const accessToken = jwt.sign(
          { id: user.id, nickname: user.nickname },
          process.env.JWT_SECRET,
          { expiresIn: "1h", issuer: "mini_project", subject: "accessToken" }
        );

        const refreshToken = jwt.sign(
          { id: user.id, nickname: user.nickname },
          process.env.JWT_SECRET,
          { expiresIn: "7d", issuer: "mini_project", subject: "refreshToken" }
        );

        User.update({ refreshToken }, { where: { id: user.id } });
        if (err) {
          console.error(err);
          return next(err);
        }

        res.cookie("userId", user.id, {
          httpOnly: false,
          secure: false,
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: false,
          secure: false,
        });
        res.status(302).redirect(process.env.CLIENT_URL);
      });
    })(req, res, next);
  } catch (err) {
    return next(err);
  }
};

exports.naverLogin = async (req, res, next) => {
  try {
    passport.authenticate("naver", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw new Error(info.message);
      }
      return req.login(user, (err) => {
        const accessToken = jwt.sign(
          { id: user.id, nickname: user.nickname },
          process.env.JWT_SECRET,
          { expiresIn: "1h", issuer: "mini_project", subject: "accessToken" }
        );

        const refreshToken = jwt.sign(
          { id: user.id, nickname: user.nickname },
          process.env.JWT_SECRET,
          { expiresIn: "7d", issuer: "mini_project", subject: "refreshToken" }
        );

        User.update({ refreshToken }, { where: { id: user.id } });
        if (err) {
          console.error(err);
          return next(err);
        }

        res.cookie("userId", user.id, {
          httpOnly: false,
          secure: false,
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: false,
          secure: false,
        });
        res.status(302).redirect(process.env.CLIENT_URL);
      });
    })(req, res, next);
  } catch (err) {
    return next(err);
  }
};

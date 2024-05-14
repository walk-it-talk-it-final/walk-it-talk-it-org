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

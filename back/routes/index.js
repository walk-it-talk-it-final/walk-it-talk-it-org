require('./toss.js')
const express = require("express");
const router = express.Router();
const projectRouter = require("./project");
const { verifyToken } = require("../middlewares");
const passport = require("passport");
const controller = require('../controllers/payments.controller.js');
const {
  createToken,
  join,
  kakaoLogin,
  refreshToken,
  naverLogin,
  googleLogin,
} = require("../controllers/auth");

// POST /api/auth/join
router.post("/auth/join", join);

// POST /api/projects
router.use("/projects", projectRouter);
router.post("/auth/login", createToken);

router.get("/auth/kakao", passport.authenticate("kakao"));
router.get("/auth/kakao/callback", kakaoLogin);
router.get("/auth/naver", passport.authenticate("naver"));
router.get("/auth/naver/callback", naverLogin);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get("/auth/google/callback", googleLogin);

router.route('/confirm').get(controller.confirmPayment);

router.post("/auth/refresh", refreshToken);

module.exports = router;

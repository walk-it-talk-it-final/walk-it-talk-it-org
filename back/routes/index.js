require("./toss.js");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const projectRouter = require("./project");
const userRouter = require("./user");
const tossRouter = require("./toss");
const communityRouter = require("./community.js");
const { verifyToken } = require("../middlewares");
const passport = require("passport");
const controller = require("../controllers/payments.controller.js");
const {
  createToken,
  join,
  kakaoLogin,
  refreshToken,
  naverLogin,
  googleLogin,
  modifyProfile,
} = require("../controllers/auth");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const limits = { fileSize: 10 * 1024 * 1024 };

const profileUpload = multer({
  storage,
  limits,
});

// POST /api/auth/join
router.post("/auth/join", join);

// POST /api/projects
router.use("/projects", projectRouter);
router.use("/users", userRouter);
router.use("/toss", tossRouter);
router.use("/posts", communityRouter);

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

router.route("/confirm").get(controller.confirmPayment);

router.post("/auth/refresh", refreshToken);

// POST /api/auth/modifyProfile
router.post(
  "/auth/modifyProfile",
  verifyToken,
  profileUpload.single("profileImage"),
  modifyProfile
);

module.exports = router;

const express = require("express");
const {
  getUser,
  getFollowers,
  getFollowings,
  modifyUser,
  deleteUser,
  follow,
  unfollow,
  getIngProjects,
} = require("../controllers/user");
const { verifyToken } = require("../middlewares");
const router = express.Router();

// /api/users/:id [GET - 특정 회원 조회]
router.get("/:id", getUser);

// PATCH /api/users/
router.patch("/", verifyToken, modifyUser);

// DELETE /api/users/
router.delete("/", verifyToken, deleteUser);

// POST /api/users/follow
router.post("/follow", verifyToken, follow);

// DELETE /api/users/follow
router.delete("/follow", verifyToken, unfollow);

// /api/users/followers/:id [GET - 특정 회원을 팔로우하는 사람들 조회] 로그인 X
router.get("/followers/:id", getFollowers);

// /api/users/followings/:id [GET - 특정 회원이 팔로우하는 사람들 조회] 로그인 X
router.get("/followings/:id", getFollowings);

// GET /api/users/ingprojects/:id
router.get("/ingprojects/:id", verifyToken, getIngProjects);

module.exports = router;

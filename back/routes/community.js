const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { verifyToken } = require("../middlewares");
const {
  getPostComments,
  uploadPostComments,
} = require("../controllers/community");

// GET /api/posts/:id/comments - 특정 게시물의 커뮤니티 게시글 조회
router.get("/:id/comments", getPostComments);

// POST /api/posts/:id/comments - 특정 게시물의 커뮤니티 게시글 등록
router.post("/:id/comments", verifyToken, uploadPostComments);

module.exports = router;

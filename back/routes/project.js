const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProjects,
  uploadProject,
  uploadImg,
  modifyProject,
  deleteProject,
} = require("../controllers/project");
const router = express.Router();
const { verifyToken } = require("../middlewares");

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

const imgUpload = multer({
  storage,
  limits,
});

// /api/projects/ [GET - 전체 게시물 조회]
// /api/projects?hashtag=사랑 [GET - 해시태그 검색 게시물 조회]
// /api/projects?userId=10 [GET - 특정 작성자의 게시물 조회]
router.get("/", getProjects);

// POST /api/projects/ - 게시물 작성
router.post("/", verifyToken, uploadProject);

// POST /api/projects/image - 게시물 이미지 업로드
router.post("/image", verifyToken, imgUpload.single("img"), uploadImg);

// PUT /api/projects/:id - 특정 게시물 수정
router.put("/:id", verifyToken, modifyProject);

// DELETE /api/projects/:id - 특정 게시물 삭제
router.delete("/:id", verifyToken, deleteProject);

module.exports = router;

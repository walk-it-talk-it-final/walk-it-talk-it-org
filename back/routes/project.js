const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProjects,
  uploadProject,
  uploadImg,
  modifyProject,
  deleteProject,
  saveLikeStatus,
  getRewards,
  getLikedProjects,
  getProjectDetail,
  uploadNotice,
  getNotices,
  uploadPost,
  getPosts,
  uploadReview,
  getReviews
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

// GET /api/projects/:id - 특정 게시물 상세 정보 조회
router.get("/:id", getProjectDetail);

// PUT /api/projects/:id - 특정 게시물 수정
router.put("/:id", verifyToken, modifyProject);

// DELETE /api/projects/:id - 특정 게시물 삭제
router.delete("/:id", verifyToken, deleteProject);

// POST /api/projects/like/:id - 게시글 좋아요 추가
router.post("/like/:id", verifyToken, saveLikeStatus);

// GET /api/projects/like/:id - 좋아요 누른 게시글 조회.
router.get("/like/:id", verifyToken, getLikedProjects);

// GET /api/projects/reward/:id - 해당 프로젝트의 전체 리워드 조회
router.get("/rewards/:id", getRewards);


// GET /api/projects/:id/notices - 특정 게시물의 공지사항 조회
router.get('/:id/notices', getNotices);

// POST /api/projects/:id/notices - 특정 게시물의 공지사항 등록
router.post('/:id/notices', verifyToken, uploadNotice);

// GET /api/projects/:id/communities - 특정 게시물의 커뮤니티 게시글 조회
router.get('/:id/communities', getPosts);

// POST /api/projects/:id/communities - 특정 게시물의 커뮤니티 게시글 등록
router.post('/:id/communities', verifyToken, uploadPost);

// GET /api/projects/:id/reviews - 특정 게시물의 커뮤니티 게시글 조회
router.get('/:id/reviews', getReviews);

// POST /api/projects/:id/reviews - 특정 게시물의 커뮤니티 게시글 등록
router.post('/:id/reviews', verifyToken, uploadReview);

module.exports = router;

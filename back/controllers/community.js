const { Project, Hashtag, User, Reward } = require("../models");
const Guestinfo = require("../models/guestinfo");
const Ongoingproject = require("../models/ongoingproject");
const Projectnotice = require("../models/projectnotice");
const Community = require("../models/community");
const Reply = require("../models/reply");
const Review = require("../models/review");
const op = require("sequelize").Op;
const sequelize = require("sequelize");

// 커뮤니티 게시글 댓글 등록
exports.uploadPostComments = async (req, res, next) => {
  try {
    const commentInput = req.body;

    commentInput.CommunityId = req.params.id;
    commentInput.UserId = req.user.id;

    // 댓글 생성
    const comment = await Reply.create(commentInput);
    const user = await comment.getUser();
    comment.setDataValue("User", user);
    res.json({
      code: 200,
      payload: { comment },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// 커뮤니티 게시글 댓글 조회
exports.getPostComments = async (req, res, next) => {
  try {
    const CommunityId = req.params.id;
    // 해당 포스트의 댓글 목록을 불러옴
    const comments = await Reply.findAll({
      where: { CommunityId },
      include: [
        {
          model: User,
          attributes: ["nickname", "profileImage"], // 필요한 유저 정보 선택
        },
      ],
    });

    res.json({
      code: 200,
      payload: comments,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

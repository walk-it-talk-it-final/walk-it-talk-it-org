const { User } = require("../models");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      // attributes: ['id', 'email', 'nickname', 'provider']
    });
    res.json({
      code: 200,
      payload: user || {},
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.modifyUser = async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );

    res.json({
      code: 200,
      message: "사용자 정보 수정 완료",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.user.id },
    });

    res.json({
      code: 200,
      message: "사용자 정보 삭제 완료",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.follow = async (req, res, next) => {
  try {
    // 내 아이디 : req.user.id
    // 상대방 아이디 : req.body.id
    const user = await User.findOne({
      where: { id: req.body.id },
    });
    if (user) {
      await user.addFollowers(req.user.id);
      res.json({
        code: 200,
        message: "팔로우 되었습니다.",
      });
    } else {
      res.json({
        code: 404,
        message: "사용자를 찾을 수 없습니다.",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    // 내 아이디 : req.user.id
    // 상대방 아이디 : req.body.id
    const user = await User.findOne({
      where: { id: req.body.id },
    });
    if (user) {
      await user.removeFollowers(req.user.id);
      res.json({
        code: 200,
        message: "언팔로우 되었습니다.",
      });
    } else {
      res.json({
        code: 404,
        message: "사용자를 찾을 수 없습니다.",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getFollowers = async (req, res, next) => {
  // 조회할 대상자의 아이디 : req.params.id
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      const followers = await user.getFollowers({
        attributes: ["id", "nickname", "email", "provider"],
      });
      res.json({
        code: 200,
        payload: followers,
      });
    } else {
      res.json({
        code: 404,
        message: "사용자를 찾을 수 없습니다.",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getFollowings = async (req, res, next) => {
  // 조회할 대상자의 아이디 : req.params.id
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      const followings = await user.getFollowings({
        attributes: ["id", "nickname", "email", "provider"],
      });
      res.json({
        code: 200,
        payload: followings,
      });
    } else {
      res.json({
        code: 404,
        message: "사용자를 찾을 수 없습니다.",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

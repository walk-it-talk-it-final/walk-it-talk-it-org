const { Project, Hashtag, User, Reward } = require("../models");
const op = require("sequelize").Op;

exports.getProjects = async (req, res, next) => {
  // query string은 req.query에 있다
  try {
    // 게시물 저장할 배열 초기화
    let projects = [];
    // 해시태그 조회라면, (해시태그 검색이라면)
    if (req.query.hashtag) {
      const hashtag = await Hashtag.findOne({
        where: { hashtagTitle: req.query.hashtag },
      });
      if (hashtag) {
        projects = await hashtag.getProjects();
      }
    } else {
      // 사용자 id로 게시물 조회
      projects = await Project.findAll({
        // 사용자 id가 없는 경우 모든 게시물 조회
        where: { userId: req.query.userId || { [op.ne]: null } },
        include: {
          model: User,
          attributes: ["id", "nickname"], // 게시물 작성자 정보(아이디, 닉네임) 포함
        },
        // 작성 시간 기준 내림차순 정렬
        order: [["createdAt", "DESC"]],
      });
    }
    // 조회된 게시물 JSON 응답
    res.json({
      code: 200,
      payload: projects,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.uploadProject = async (req, res, next) => {
  try {
    // 요청 바디에서 프로젝트 데이터 가져오기
    const projectInput = req.body;
    projectInput["userId"] = req.user.id;
    console.log(projectInput);
    // 프로젝트 생성
    const project = await Project.create(projectInput);
    // 요청 바디에서 해시태그 배열 가져오기
    const hashtagArr = req.body.hashtags;
    // console.log(hashtagArr);
    // 해시태그 있으면 hashtag 테이블에 추가
    if (hashtagArr) {
      const result = await Promise.all(
        hashtagArr.map((tag) => {
          return Hashtag.findOrCreate({
            where: { hashtagTitle: tag.title.toLowerCase() },
          });
        })
      );
      await project.addHashtags(result.map((r) => r[0]));
    }

    const rewards = req.body.rewards;
    // console.log(rewards);

    if (rewards) {
      await Promise.all(
        rewards.map((reward) => {
          return Reward.create({
            rewardOption: reward.rewardOption,
            rewardPrice: reward.rewardPrice,
            rewardEa: reward.limitedQuantity,
            rewardSellCount: 0,
            ProjectProjectId: project.projectId,
          });
        })
      );
    }

    // 이미지 경로 업데이트
    if (req.body.project_thumb_img) {
      await project.update({ project_thumb_img: req.body.project_thumb_img });
    }

    res.json({
      code: 200,
      payload: project,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.uploadImg = (req, res) => {
  res.json({
    code: 200,
    img: `/uploads/${req.file.filename}`,
  });
};

exports.modifyProject = async (req, res, next) => {
  try {
    await Project.update(
      {
        content: req.body.content,
        img: req.body.img,
      },
      {
        where: { id: req.params.id },
      }
    );
    const project = await Project.findOne({
      where: { id: req.params.id },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            // 해시태그 있으면 찾아내고 없으면 만들어라
            //'#해시태그'로 들어가므로 1번째 자리부터 슬라이스해 찾아
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await project.addHashtags(result.map((r) => r[0]));
    }
    res.json({
      code: 200,
      payload: project,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await Project.destroy({
      where: { id: req.params.id },
    });
    res.json({
      code: 200,
      message: "게시글이 삭제되었습니다.",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.saveLikeStatus = async (req, res, next) => {
  try {
    // 게시글이 존재하는지부터 검사
    const project = await Project.findOne({
      where: { project_id: req.params.id },
    });
    if (!project) {
      return res.status(404).send("프로젝트를 찾지 못했습니다.");
    }
    await project.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getRewards = async (req, res, next) => {
  try {
    const ProjectProjectId = req.params.id;
    const rewards = await Reward.findAll({
      // where: { project_id: req.params.id },
      where: { ProjectProjectId },
      attributes: ["rewardPrice"],
    });

    res.json(rewards);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

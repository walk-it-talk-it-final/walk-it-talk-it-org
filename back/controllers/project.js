const { Project, Hashtag, User, Reward } = require("../models");
const Guestinfo = require("../models/guestinfo");
const Ongoingproject = require("../models/ongoingproject");
const op = require("sequelize").Op;
const sequelize = require("sequelize");

// 프로젝트 검색
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
        projects = await hashtag.getProjects({
          include: [
            {
              model: User,
              attributes: ["id", "nickname"], // 게시물 작성자 정보(아이디, 닉네임) 포함
            },
            {
              model: Reward,
            },
          ],
          order: [["createdAt", "DESC"]],
        });
      }
    } else {
      // 사용자 id로 게시물 조회
      const whereCondition = req.query.userId
        ? { UserId: req.query.userId }
        : {};
      projects = await Project.findAll({
        // 사용자 id가 없는 경우 모든 게시물 조회
        where: whereCondition,
        include: [
          {
            model: User,
            attributes: ["id", "nickname"], // 게시물 작성자 정보(아이디, 닉네임) 포함
          },
          {
            model: Reward,
          },
        ],
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

// 프로젝트 등록
exports.uploadProject = async (req, res, next) => {
  try {
    // 요청 바디에서 프로젝트 데이터 가져오기
    const projectInput = req.body;
    projectInput.UserId = req.user.id;

    // 프로젝트 생성
    const project = await Project.create(projectInput);

    // 프로젝트 ID를 사용하여 thumbnailLink 생성
    const thumbnailLink = `${req.protocol}://${req.get("host")}/project/${project.projectId}`;

    // ongoinprojects 테이블에 추가
    await Ongoingproject.create({
      ProjectProjectId: project.projectId,
      UserId: req.user.id,
      thumbnailLink: thumbnailLink,
    });

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

    // 리워드 db에 추가
    const rewards = req.body.rewards;
    // console.log(rewards);

    if (rewards) {
      await Promise.all(
        rewards.map((reward) => {
          return Reward.create({
            rewardOption: reward.rewardOption,
            rewardPrice: reward.rewardPrice,
            rewardEa: reward.limitedQuantity || null,
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

// 이미지 등록
exports.uploadImg = (req, res) => {
  res.json({
    code: 200,
    img: `/uploads/${req.file.filename}`,
  });
};

// 프로젝트 상세 검색
exports.getProjectDetail = async (req, res, next) => {
  try {
    // 프로젝트 ID는 req.params.id에 있다
    const projectId = req.params.id;
    // 프로젝트 정보 쿼리
    const project = await Project.findOne({
      where: { projectId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"], // 게시물 작성자 정보(아이디, 닉네임) 포함
        },
      ],
    });

    // 참가자 수 세기
    const guestCount = await Guestinfo.count({
      where: { ProjectProjectId: projectId },
    });

    // 리워드 정보 쿼리
    const rewards = await Reward.findAll({
      where: { ProjectProjectId: projectId },
    });

    // 총 리워드 금액 계산
    const totalRewardAmount = rewards.reduce((sum, reward) => {
      return sum + reward.rewardPrice * reward.rewardSellCount;
    }, 0);

    // 달성률 계산
    const achievementRate =
      project.projectTargetPrice > 0
        ? Math.ceil((totalRewardAmount / project.projectTargetPrice) * 100)
        : 0;

    // 남은 일수 계산
    const calculateDaysLeft = (finishDate) => {
      const finishTime = new Date(finishDate).getTime();
      const currentTime = new Date().getTime();
      const differenceInDays = Math.ceil(
        (finishTime - currentTime) / (1000 * 60 * 60 * 24)
      );
      return differenceInDays < 0 ? "종료" : differenceInDays;
    };

    const daysLeft = calculateDaysLeft(project.projectFinishAt);

    // 좋아요 수 세기
    const likers = await project.getLikers();
    const likeCount = likers.length;

    // const likeCount = await like.count({
    //   where: { ProjectProjectId: projectId },
    // });

    // 넘겨줄 정보 정리
    const projectDetail = {
      ...project.toJSON(),
      guestCount,
      totalRewardAmount,
      achievementRate,
      daysLeft,
      likeCount,
    };

    res.json({
      code: 200,
      payload: projectDetail,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// 프로젝트 수정
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

// 프로젝트 삭제
exports.deleteProject = async (req, res, next) => {
  try {
    await Project.destroy({
      where: { projectId: req.params.id },
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

// 좋아요 누르기
exports.saveLikeStatus = async (req, res, next) => {
  try {
    // 게시글이 존재하는지부터 검사
    const project = await Project.findOne({
      where: { project_id: req.params.id },
    });
    if (!project) {
      return res.status(404).send("프로젝트를 찾지 못했습니다.");
    }
    if (req.body.liked) {
      await project.addLiker(req.user.id);
    } else {
      await project.removeLiker(req.user.id);
    }
    res.json({ userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// 좋아요 상태 조회
exports.getLikedProjects = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const likedProjects = await Project.findAll({
      include: [
        {
          model: User,
          as: "Likers",
          attributes: ["id", "nickname"],
        },
      ],
      where: {
        "$Likers.id$": userId,
      },
      order: [["createdAt", "DESC"]],
    });
    res.json({
      code: 200,
      payload: likedProjects,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// 리워드 검색
exports.getRewards = async (req, res, next) => {
  try {
    const ProjectProjectId = req.params.id;
    const rewards = await Reward.findAll({
      // where: { project_id: req.params.id },
      where: { ProjectProjectId },
      attributes: ["rewardPrice", "rewardSellCount"],
    });

    res.json(rewards);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

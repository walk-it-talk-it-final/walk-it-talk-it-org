const { Project, Hashtag, User } = require("../models");
const op = require("sequelize").Op;

exports.getProjects = async (req, res, next) => {
  // query string은 req.query에 있다
  try {
    let projects = [];
    // 해시태그 조회라면,
    if (req.query.hashtag) {
      const hashtag = await Hashtag.findOne({
        where: { title: req.query.hashtag },
      });
      if (hashtag) {
        projects = await hashtag.getProjects({
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        });
      }
    } else {
      projects = await Project.findAll({
        where: { userId: req.query.userId || { [op.ne]: null } },
        include: {
          model: User,
          attributes: ["id", "nickname"],
        },
        order: [["createdAt", "DESC"]],
      });
    }
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
    const projectInput = req.body;
    projectInput["userId"] = req.user.id;
    console.log(projectInput);
    const project = await Project.create(projectInput);

    // const hashtags = req.body.hashtag.split(",");
    // console.log(hashtags);
    // if (hashtags) {
    //   const result = await Promise.all(
    //     hashtags.map((tag) => {
    //       return Hashtag.findOrCreate({
    //         // 해시태그 있으면 찾아내고 없으면 만들어라
    //         //'#해시태그'로 들어가므로 1번째 자리부터 슬라이스해 찾아
    //         where: { title: tag.slice(1).toLowerCase() },
    //       });
    //     })
    //   );
    //   await project.addHashtags(result.map((r) => r[0]));
    // }
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

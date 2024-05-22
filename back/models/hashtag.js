const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      {
        hashtagTitle: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Project, {
      through: "ProjectHashtag",
      timestamps: false,
    });
  }
}

module.exports = Hashtag;

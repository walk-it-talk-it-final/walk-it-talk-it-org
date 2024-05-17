const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      {
        hashtagTitle: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        hashtagContext: {
          type: Sequelize.STRING(20),
          allowNull: true,
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
      as: "Hashtaged",
      timestamps: false,
    });
  }
}

module.exports = Hashtag;

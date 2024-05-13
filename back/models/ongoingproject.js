const Sequelize = require("sequelize");

class Ongoingproject extends Sequelize.Model {
  static initiate(sequelize) {
    Ongoingproject.init(
      {
        thumbnailLink: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
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
    db.Ongoingproject.belongsTo(db.Project);
    db.Ongoingproject.belongsTo(db.User);
  }
}

module.exports = Ongoingproject;

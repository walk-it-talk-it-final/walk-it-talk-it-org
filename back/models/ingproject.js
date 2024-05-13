const Sequelize = require("sequelize");

class Ingproject extends Sequelize.Model {
  static initiate(sequelize) {
    Ingproject.init(
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
    db.Ingproject.belongsTo(db.Project);
    db.Ingproject.belongsTo(db.User);
  }
}

module.exports = Ingproject;

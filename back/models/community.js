const Sequelize = require("sequelize");

class Community extends Sequelize.Model {
  static initiate(sequelize) {
    Community.init(
      {
        commuTitle: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        commuContent: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        commuUploadDate: {
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
    db.Community.belongsTo(db.Project);
    db.Community.belongsTo(db.User);
    db.Community.hasMany(db.Reply);
  }
}

module.exports = Community;

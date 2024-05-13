const Sequelize = require("sequelize");

class Projectnotice extends Sequelize.Model {
  static initiate(sequelize) {
    Projectnotice.init(
      {
        noticeTitle: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        noticeContent: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        noticeUploadDate: {
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
    db.Projectnotice.belongsTo(db.Project);
    db.Projectnotice.belongsTo(db.User);
  }
}

module.exports = Projectnotice;

const Sequelize = require("sequelize");

class Reply extends Sequelize.Model {
  static initiate(sequelize) {
    Reply.init(
      {
        replyContent: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        replyUploadDate: {
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
    db.Reply.belongsTo(db.User);
    db.Reply.belongsTo(db.Community);
  }
}

module.exports = Reply;

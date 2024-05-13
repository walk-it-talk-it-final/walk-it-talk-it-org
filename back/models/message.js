const Sequelize = require("sequelize");

class Message extends Sequelize.Model {
  static initiate(sequelize) {
    Message.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.BOOLEAN,
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
    db.Message.belongsTo(db.ChatRoom);
    db.Message.belongsTo(db.User);
  }
}

module.exports = Message;

const Sequelize = require("sequelize");

class ChatRoom extends Sequelize.Model {
  static initiate(sequelize) {
    ChatRoom.init(
      {
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updatedAt: {
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
    db.ChatRoom.belongsTo(db.Project);
    db.ChatRoom.belongsTo(db.User);
  }
}

module.exports = ChatRoom;

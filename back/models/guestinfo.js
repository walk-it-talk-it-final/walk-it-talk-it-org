const Sequelize = require("sequelize");

class Guestinfo extends Sequelize.Model {
  static initiate(sequelize) {
    Guestinfo.init(
      {
        guestEmail: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        guestPhone: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        guestName: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        orderId: {
          type: Sequelize.STRING(50),
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
    db.Guestinfo.belongsTo(db.Project);
    db.Guestinfo.belongsTo(db.User);
    db.Guestinfo.belongsTo(db.Reward);
  }
}

module.exports = Guestinfo;

const Sequelize = require("sequelize");

class Reward extends Sequelize.Model {
  static initiate(sequelize) {
    Reward.init(
      {
        rewardOption: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        rewardPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rewardEa: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        rewardSellCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        rewardStatus: {
          type: Sequelize.STRING(2),
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
    db.Reward.belongsTo(db.Project);
    db.Reward.hasMany(db.Guestinfo);
  }
}

module.exports = Reward;

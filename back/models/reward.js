module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define(
    "Reward",
    {
      rewardOption: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      rewardPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rewardEa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rewardSellCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      rewardStatus: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Reward.associate = (db) => {};
  return Reward;
};

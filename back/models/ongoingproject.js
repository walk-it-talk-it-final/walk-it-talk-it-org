module.exports = (sequelize, DataTypes) => {
  const Ongoingproject = sequelize.define(
    "Ongoingproject",
    {
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      thumbnailLink: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Ongoingproject.associate = (db) => {};
  return Ongoingproject;
};

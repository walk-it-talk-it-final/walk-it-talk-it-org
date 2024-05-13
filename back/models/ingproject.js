module.exports = (sequelize, DataTypes) => {
  const Ingproject = sequelize.define(
    "Ingproject",
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
  Ingproject.associate = (db) => {};
  return Ingproject;
};

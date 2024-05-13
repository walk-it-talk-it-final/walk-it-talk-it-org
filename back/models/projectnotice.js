module.exports = (sequelize, DataTypes) => {
  const Projectnotice = sequelize.define(
    "Projectnotice",
    {
      noticeTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noticeContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      noticeUploadDate: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Projectnotice.associate = (db) => {};
  return Projectnotice;
};

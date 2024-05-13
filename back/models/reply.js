module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    "Reply",
    {
      replyContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      replyUploadDate: {
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
  Reply.associate = (db) => {};
  return Reply;
};

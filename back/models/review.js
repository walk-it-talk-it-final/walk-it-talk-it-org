module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      reviewTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reviewContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reviewUploadDate: {
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
  Review.associate = (db) => {};
  return Review;
};

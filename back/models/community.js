module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define(
    "Community",
    {
      commuTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commuContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commuUploadDate: {
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
  Community.associate = (db) => {
    db.Community.hasMany(db.Reply);
  };
  return Community;
};

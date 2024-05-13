module.exports = (sequelize, DataTypes) => {
  const Guestinfo = sequelize.define(
    "Guestinfo",
    {
      guestEmail: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      guestPhone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      guestName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Guestinfo.associate = (db) => {};
  return Guestinfo;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
      timestamps: false,
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Ingproject);
    db.User.hasMany(db.Ongoingproject);
    db.User.hasMany(db.Guestinfo);
    db.User.hasMany(db.Chatroom);
    db.User.hasMany(db.Message);
    db.User.hasMany(db.Projectnotice);
    db.User.hasMany(db.Review);
    db.User.hasMany(db.Community);
    db.User.hasMany(db.Reply);
    db.User.belongsToMany(db.Project, {
      through: "Like",
      as: "Liked",
      timestamps: false,
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
      timestamps: false,
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
      timestamps: false,
    });
  };
  return User;
};

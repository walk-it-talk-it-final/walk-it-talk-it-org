const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        profileImage: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Ingproject);
    db.User.hasMany(db.Ongoingproject);
    db.User.hasOne(db.Guestinfo);
    db.User.hasMany(db.ChatRoom);
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
  }
}

module.exports = User;

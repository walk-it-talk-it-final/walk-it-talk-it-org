const Sequelize = require("sequelize");

class Project extends Sequelize.Model {
  static initiate(sequelize) {
    Project.init(
      {
        projectId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        projectTitle: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        projectTargetPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        projectContent: {
          type: Sequelize.STRING(2000),
          allowNull: false,
        },
        projectThumbImg: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        projectStatus: {
          type: Sequelize.STRING(2),
          allowNull: true,
        },
        projectCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        hashtag: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        managerName: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        managerEmail: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        managerPhone: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        managerBank: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        managerAccount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Project.hasMany(db.Ingproject);
    db.Project.hasMany(db.Ongoingproject);
    db.Project.hasOne(db.Guestinfo);
    db.Project.hasOne(db.Community);
    db.Project.hasOne(db.Review);
    db.Project.hasOne(db.Projectnotice);
    db.Project.hasOne(db.Reward);
    db.Project.hasOne(db.ChatRoom);
    db.Project.belongsToMany(db.User, {
      through: "Like",
      as: "Likers",
      timestamps: false,
    });
  }
}

module.exports = Project;

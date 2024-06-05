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
        storyContent: {
          type: Sequelize.STRING(2000),
          allowNull: false,
        },
        budgetContent: {
          type: Sequelize.STRING(2000),
          allowNull: false,
        },
        scheduleContent: {
          type: Sequelize.STRING(2000),
          allowNull: false,
        },
        creatorContent: {
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
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        projectFinishAt: {
          type: Sequelize.DATE,
          allowNull: false,
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
    db.Project.hasMany(db.Guestinfo);
    db.Project.hasMany(db.Community);
    db.Project.hasMany(db.Review);
    db.Project.hasMany(db.Projectnotice);
    db.Project.hasMany(db.Reward);
    db.Project.hasMany(db.ChatRoom);
    db.Project.belongsTo(db.User);
    db.Project.belongsToMany(db.User, {
      through: "Like",
      as: "Likers",
      timestamps: false,
    });
    db.Project.belongsToMany(db.Hashtag, {
      through: "ProjectHashtag",
      timestamps: false,
    });
  }
}

module.exports = Project;

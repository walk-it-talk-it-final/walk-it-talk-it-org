module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      projectTitle: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      projectTargetPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectContent: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      projectThumbImg: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      projectStatus: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      projectCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hashtag: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      managerName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      managerEmail: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      managerPhone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      managerBank: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      managerAccount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: true,
      underscored: true,
    }
  );

  Project.associate = (db) => {
    db.Project.hasMany(db.Ingproject);
    db.Project.hasMany(db.Ongoingproject);
    db.Project.hasMany(db.Guestinfo);
    db.Project.hasMany(db.Community);
    db.Project.hasMany(db.Review);
    db.Project.hasMany(db.Projectnotice);
    db.Project.hasMany(db.Reward);
    db.Project.hasMany(db.Chatroom);
    db.Project.hasMany(db.Reply);
    db.Project.belongsToMany(db.User, {
      through: "Like",
      as: "Likers",
      timestamps: false,
    });
  };
  return Project;
};

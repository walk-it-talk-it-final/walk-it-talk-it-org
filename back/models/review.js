const Sequelize = require("sequelize");

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        reviewContent: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        reviewUploadDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.Project);
    db.Review.belongsTo(db.User);
    db.Review.belongsTo(db.Reward);
  }
}

module.exports = Review;

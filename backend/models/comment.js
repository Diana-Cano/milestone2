'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({List}) {
      Comment.belongsTo(List, {
        foreignKey: "list_id"
      });
    }
  }
  Comment.init({
    comment_id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false
  });
  return Comment;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, Comment}) {
      List.hasMany(Comment, {
        foreignKey: "list_id"
      });
      List.belongsTo(Category, {
        foreignKey: "category_id"
      });
    }
  }
  // Build the List table in PostgreSQL
  List.init({
    list_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    list_item: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'List',
    tableName: "lists",
    timestamps: false
  });
  return List;
};
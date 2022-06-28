"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag_User_Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tag_User_Restaurant.init(
    {
      tag_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tag_User_Restaurant",
    }
  );
  return Tag_User_Restaurant;
};

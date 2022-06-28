"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating_Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating_Restaurant.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Rating_Restaurant.init(
    {
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rating_Restaurant",
    }
  );
  return Rating_Restaurant;
};

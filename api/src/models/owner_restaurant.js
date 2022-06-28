"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owner_Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Owner_Restaurant.init(
    {
      user_id: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Owner_Restaurant",
    }
  );
  return Owner_Restaurant;
};

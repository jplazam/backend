"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Restaurant.hasMany(models.Comment, {
        foreignKey: "restaurantId",
        onDelete: "CASCADE",
      });
      Restaurant.hasMany(models.Rating_Restaurant, {
        foreignKey: "restaurant_id",
        onDelete: "CASCADE",
      });
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.STRING,
      menu: DataTypes.TEXT,
      contact: DataTypes.TEXT,
      image: DataTypes.STRING,
      isBookable: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Restaurant",
      validate: {
        nameIsRequired() {
          if (!this.name) {
            throw new Error("Name is required");
          }
        },
      },
    }
  );
  return Restaurant;
};

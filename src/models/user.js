"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Rating_Restaurant, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      validate: {
        nameIsRequired() {
          if (!this.name) {
            throw new Error("Name is required");
          }
        },
        emailIsRequired() {
          if (!this.email) {
            throw new Error("Email is required");
          }
        },
        passwordIsRequired() {
          if (!this.password) {
            throw new Error("Password is required");
          }
        },
      },
    }
  );

  return User;
};

"use strict";

const bcrypt = require("bcrypt");
const authConfig = require("../config/auth");

let password = bcrypt.hashSync("demo_user", Number.parseInt(authConfig.rounds));

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "demo_user",
        email: "demo_user@uc.cl",
        password: password,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

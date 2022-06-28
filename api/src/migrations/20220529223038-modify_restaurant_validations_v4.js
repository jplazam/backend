"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "name"),
      await queryInterface.addColumn(
        "Restaurants", // table name
        "name", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true, // notEmpty validator
        }
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "name"),
      await queryInterface.addColumn("Restaurants", "name", {
        type: Sequelize.STRING,
      });
  },
};

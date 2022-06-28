"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "isBookable"),
      await queryInterface.addColumn(
        "Restaurants", // table name
        "isBookable", // new field name
        {
          type: Sequelize.STRING,
          defaultValue: false,
        }
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "isBookable"),
      await queryInterface.addColumn("Restaurants", "isBookable", {
        type: Sequelize.STRING,
      });
  },
};

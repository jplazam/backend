"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Restaurants", // table name
      "user_id", // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true, // notEmpty validator
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "user_id");
  },
};

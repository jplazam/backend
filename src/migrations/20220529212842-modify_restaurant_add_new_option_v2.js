"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "image"),
      await queryInterface.addColumn(
        "Restaurants", // table name
        "image", // new field name
        {
          type: Sequelize.STRING,
          defaultValue:
            "https://us.123rf.com/450wm/alexwhite/alexwhite1503/alexwhite150304633/38136188-comer-icono-plana-restaurante-sÝmbolo.jpg?ver=6",
        }
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Restaurants", "image"),
      await queryInterface.addColumn("Restaurants", "image", {
        type: Sequelize.STRING,
      });
  },
};

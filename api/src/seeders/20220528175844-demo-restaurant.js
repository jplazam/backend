"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Restaurants", [
      {
        name: "demo_restaurant",
        address: "demo_address",
        description: "demo_description",
        menu: "",
        contact: "demo_contact",
        image:
          "https://us.123rf.com/450wm/alexwhite/alexwhite1503/alexwhite150304633/38136188-comer-icono-plana-restaurante-símbolo.jpg?ver=6",
        isBookable: false,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "demo_restaurant",
        address: "demo_address",
        description: "demo_description",
        menu: "",
        contact: "demo_contact",
        image:
          "https://us.123rf.com/450wm/alexwhite/alexwhite1503/alexwhite150304633/38136188-comer-icono-plana-restaurante-símbolo.jpg?ver=6",
        isBookable: false,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "demo_restaurant",
        address: "demo_address",
        description: "demo_description",
        menu: "",
        contact: "demo_contact",
        image:
          "https://us.123rf.com/450wm/alexwhite/alexwhite1503/alexwhite150304633/38136188-comer-icono-plana-restaurante-símbolo.jpg?ver=6",
        isBookable: false,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Restaurants", null, {});
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tags", [
      {
        content: "tag1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "tag2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "tag3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "tag4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};

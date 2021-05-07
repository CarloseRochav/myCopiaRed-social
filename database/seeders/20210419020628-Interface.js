"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Interfaces",
      [
        {
          logo: "Logo",
          primaryColor: "fff",
          secondaryColor: "000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Interfaces", null, {});
  },
};

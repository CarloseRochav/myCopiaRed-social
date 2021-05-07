"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Tecnologia",
          picture: "Ninguno",
          description: "lorem ipsum ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Musica",
          picture: "Ninguno",
          description: "lorem ipsum x2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};

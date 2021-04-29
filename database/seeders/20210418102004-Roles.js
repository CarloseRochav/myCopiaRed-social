"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Roles por defecto

    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "Administrador",
          description: "Administrador del sistema.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Auxiliar",
          description: "Usuario Auxiliar.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vip",
          description: "Usuario Vip.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Usuario",
          description: "Usuario Comun.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};

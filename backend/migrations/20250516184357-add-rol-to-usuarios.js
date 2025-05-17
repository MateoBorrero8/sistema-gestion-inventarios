'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Usuarios', 'rol', {
    type: Sequelize.STRING,
    defaultValue: 'user' // todos por defecto son "user"
  });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Usuarios', 'rol');
  }
};


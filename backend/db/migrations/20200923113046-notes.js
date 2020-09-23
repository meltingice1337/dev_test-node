'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('notes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      data: Sequelize.JSONB,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('notes');
  }
};

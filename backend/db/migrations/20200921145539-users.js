'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      password: Sequelize.DataTypes.STRING,
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE
    }, {
      hooks: {
        beforeCreate: function (person, options, fn) {
          person.createdAt = new Date();
          person.updatedAt = new Date();
          fn(null, person);
        },
        beforeUpdate: function (person, options, fn) {
          person.updatedAt = new Date();
          fn(null, person);
        }
      }
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};

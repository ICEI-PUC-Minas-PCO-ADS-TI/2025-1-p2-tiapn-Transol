'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('aluno', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      escola: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_nasc: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      entrada: {
        type: Sequelize.TIME,
        allowNull: false
      },
      saida: {
        type: Sequelize.TIME,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
   
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('aluno');
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('clientes', {
       id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('clientes');
  }
};

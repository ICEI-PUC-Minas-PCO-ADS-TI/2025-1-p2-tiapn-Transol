// src/back/migrations/SEU_TIMESTAMP_add-email-senha-to-administrador.js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Adiciona a coluna 'email' à tabela 'administrador'
    await queryInterface.addColumn('administrador', 'email', {
      type: Sequelize.STRING,
      allowNull: false, // O email será obrigatório
      unique: true      // O email deve ser único
    });

    // Adiciona a coluna 'senha' à tabela 'administrador'
    await queryInterface.addColumn('administrador', 'senha', {
      type: Sequelize.STRING,
      allowNull: false // A senha será obrigatória
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove as colunas 'email' e 'senha' se a migração for revertida
    await queryInterface.removeColumn('administrador', 'email');
    await queryInterface.removeColumn('administrador', 'senha');
  }
};

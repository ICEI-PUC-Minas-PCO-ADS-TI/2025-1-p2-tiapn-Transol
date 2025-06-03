'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('clientes', 'id_administrador', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'administrador',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
      
    });
  },

  async dow(queryInterface, Sequelize) {
    await queryInterface.removeColumn('clientes', 'id_administrador');
  }

};
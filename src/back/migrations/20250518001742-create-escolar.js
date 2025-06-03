'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('escolar', {
    id: { 
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    data_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    mensalidade: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    turno: {
      type: Sequelize.STRING,
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

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('escolar');
  }
};

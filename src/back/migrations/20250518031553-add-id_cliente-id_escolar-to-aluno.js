'use strick';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('aluno', 'id_clientes', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });


    await queryInterface.addColumn('aluno', 'id_escolar', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'escolar',
        key:'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },


  async down(queryInterface) {
    await queryInterface.remove.Column('aluno', 'id_clientes');
    await queryInterface.remove.Column('aluno', 'id_escolar');
  }
};

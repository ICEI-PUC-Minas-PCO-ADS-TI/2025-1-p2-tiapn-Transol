'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    id_administrador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'administrador',
        key: 'id'
      }
    }
  }, {
    tableName: 'clientes', // igual ao nome da tabela na migration
    timestamps: true       // para createdAt e updatedAt
  });

  Cliente.associate = function(models) {
    Cliente.belongsTo(models.Administrador, {
      foreignKey: 'id_administrador',
      as: 'administrador'
    });

    Cliente.hasMany(models.Contrato, {
      foreignKey: 'clientesId',
      as: 'contrato'
    });

    
  };

  return Cliente;
};

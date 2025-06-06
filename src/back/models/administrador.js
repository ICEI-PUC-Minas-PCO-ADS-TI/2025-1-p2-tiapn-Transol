'use strict';
const bcrypt = require('bcryptjs'); // Para hashing de senha

module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define('Administrador', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { // Ou nome_usuario, o que você usar para login
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: { // Adicionado para corresponder à migração
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: { // Adicionado para corresponder à migração
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'administrador', // <<< CORREÇÃO AQUI: Nome da tabela no DB é 'administrador'
    timestamps: true,
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.senha) {
          const salt = await bcrypt.genSalt(10);
          admin.senha = await bcrypt.hash(admin.senha, salt);
        }
      }
    }
  });

  Administrador.associate = function(models) {
    Administrador.hasMany(models.Clientes, {
      foreignKey: 'id_administrador',
      as: 'clientesCadastrados'
    });
  };

  return Administrador;
};

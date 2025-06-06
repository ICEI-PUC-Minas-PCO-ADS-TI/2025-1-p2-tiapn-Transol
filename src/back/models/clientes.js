// src/back/models/clientes.js
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
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
    cpf: {
      type: DataTypes.STRING(11), // CPF tem tamanho específico
      allowNull: false,
      unique: true // CPF deve ser único
    },
    endereco: { // <<< ADICIONADO (Baseado na migração)
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: { // <<< ADICIONADO (Baseado na migração)
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { // Mantido como estava no seu modelo (assumindo que existe no DB)
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    senha: { // Mantido como estava no seu modelo (assumindo que existe no DB)
      type: DataTypes.STRING,
      allowNull: false
    },
    id_administrador: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permitir nulo, conforme a migração
        references: {
            model: 'Administradors',
            key: 'id'
        }
    }
  }, {
    hooks: {
      beforeCreate: async (cliente) => {
        if (cliente.senha) {
          const salt = await bcrypt.genSalt(10);
          cliente.senha = await bcrypt.hash(cliente.senha, salt);
        }
      },
       // <<< REMOVA O BLOCO beforeUpdate COMPLETO AQUI
      // Ou comente-o assim:
      /*
      beforeUpdate: async (cliente) => {
        if (cliente.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          cliente.senha = await bcrypt.hash(cliente.senha, salt);
        }
      } */
    },
    tableName: 'clientes', // Assegura que o Sequelize use o nome 'clientes' na tabela
    timestamps: true // Adicionado para corresponder às migrações que adicionam timestamps
  });

  Clientes.associate = (models) => {
    Clientes.hasMany(models.Aluno, {
      foreignKey: 'id_clientes', // Agora correspondendo ao nome da coluna na migração do aluno
      as: 'alunos'
    });
    Clientes.belongsTo(models.Administrador, {
        foreignKey: 'id_administrador',
        as: 'administrador'
    });
    Clientes.hasOne(models.Contrato, {
        foreignKey: 'clientesId', // Mantido como estava no seu contrato.js. Certifique-se que o id_cliente no contrato.js é na verdade clientesId.
        as: 'contrato'
    });
  };

  return Clientes;
};
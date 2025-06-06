// src/back/models/aluno.js
module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
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
    escola: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_nasc: { // <<< ADICIONADO (Baseado na migração)
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    entrada: { // <<< ADICIONADO (Baseado na migração)
      type: DataTypes.TIME,
      allowNull: false
    },
    saida: { // <<< ADICIONADO (Baseado na migração)
      type: DataTypes.TIME,
      allowNull: false
    },
    id_clientes: { // <<< RENOMEADO para 'id_clientes' para corresponder à migração
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes', // Nome da tabela no DB
        key: 'id'
      }
    },
    id_escolar: {
      type: DataTypes.INTEGER,
      allowNull: false, // <<< Alterado para false, conforme a migração
      references: {
        model: 'escolar', // Nome da tabela no DB
        key: 'id'
      }
    }
  }, {
    tableName: 'aluno', // Assegura que o Sequelize use o nome 'aluno' na tabela
    timestamps: true // Para que createdAt e updatedAt funcionem
  });

  Aluno.associate = (models) => {
    Aluno.belongsTo(models.Clientes, {
      foreignKey: 'id_clientes', // <<< Usar 'id_clientes' aqui também
      as: 'cliente'
    });
    Aluno.belongsTo(models.Escolar, {
      foreignKey: 'id_escolar',
      as: 'escolar'
    });
  };

  return Aluno;
};
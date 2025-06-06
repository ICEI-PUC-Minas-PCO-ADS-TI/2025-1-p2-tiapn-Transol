'use strict';

module.exports = (sequelize, DataTypes) => {
    const Escolar = sequelize.define('Escolar', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        data_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        mensalidade: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'escolar',
        timestamps: false // Definido como false porque createdAt e updatedAt são definidos explicitamente
    });

    Escolar.associate = function(models) {
        Escolar.hasMany(models.Aluno, {
            foreignKey: 'id_escolar',
            as: 'alunos'
        });
    };

    return Escolar;
};

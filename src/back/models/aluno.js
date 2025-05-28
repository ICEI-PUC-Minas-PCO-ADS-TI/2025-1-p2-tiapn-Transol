'use strict';


module.exports = (Sequelize, DataTypes) => {
    const Aluno = Sequelize.define('Aluno', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        escola: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_nasc: {
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
        entrada: {
            type: DataTypes.TIME,
            allowNull: false
        },
        saida: {
            type: DataTypes.TIME,
            allowNull: false
        },
        id_clientes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_escolar: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'aluno',
        timestamps: true
    });

    Aluno.associate = function(models) {
        //relacionamentos futuros, se necessario
        Aluno.belongsTo(models.Cliente, {
        foreignKey: 'id_clientes',
        as: 'cliente'   
        });

        Aluno.belongsTo(models.Escolar, {
            foreignKey: 'id_escolar',
            as: 'escolar'
        });
        
    };

    return Aluno;
};
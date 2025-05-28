'use strict';


module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define('Administrador', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'administrador',
        timestamps: true
    });

    Administrador.associate = function(models) {
        //possivel relacionamento
    };

    return Administrador;
};
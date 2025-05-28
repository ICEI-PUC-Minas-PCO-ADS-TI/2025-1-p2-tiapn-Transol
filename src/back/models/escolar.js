'use strict';


module.exports = (sequelize, DataTypes) => {
    const Escolar = sequelize.define('Escolar', {
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
        }
    }, {
        tableName: 'escolar',
        timestamps: true
    
    });

    return Escolar;
};
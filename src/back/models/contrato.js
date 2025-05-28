'use strict';


module.exports = (sequelize, DataTypes) => {
    const Contrato = sequelize.define('Contrato', {
        data_servico:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        valor_Servico: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clientesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'contrato',
        timestamps: true
    });

    Contrato.associate = function(models) {
        //futuro relacionamento
        Contrato.belongsTo(models.Cliente, {
            foreignKey: 'clientesId',
        });
    };

    return Contrato;
};
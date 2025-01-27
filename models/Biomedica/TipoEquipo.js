const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Servicio = sequelize.define('Servicio', {
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    materialConsumible: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    herramienta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    herramienta: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'servicio',
    timestamps: true,
}
);
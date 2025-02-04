const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const TipoEquipo = sequelize.define('TipoEquipo', {
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
    tableName: 'tipoEquipos',
    timestamps: true,
}
);

module.exports = TipoEquipo;
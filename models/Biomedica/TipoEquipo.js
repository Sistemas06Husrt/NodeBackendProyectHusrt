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
    tiempoMinutos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repuestosMinimos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Biomedica, Sistemas, Mantenimiento
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actividad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tipoEquipos',
    timestamps: true,
}
);

module.exports = TipoEquipo;
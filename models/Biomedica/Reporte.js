const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Reporte = sequelize.define('Reporte', {

    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horaLlamado: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horaTerminacion: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horaTotal: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    tipoMantenimiento: {
        type: DataTypes.ENUM('Correctivo', 'Preventivo', 'Predictivo'),
        allowNull: false
    },
    trabajoRealizado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'responsables',
    timestamps: true,
});

module.exports = Responsable;
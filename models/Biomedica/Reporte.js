const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const Equipo = require('./Equipo');
const Usuario = require('./../generales/Usuario');
const Servicio = require('./../generales/Servicio');
 
const Reporte = sequelize.define('Reporte', {
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
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
    tipoFalla: {
        type: DataTypes.ENUM('Desgaste', 'Operacion Indevida', 'Causa Extera', 'Accesorios', 'Desconocido', 'sin Falla', 'Otros'),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motivo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    trabajoRealizado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombreRecibio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cedulaRecibio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    mantenimientoPropio: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    realizado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    rutaPdf: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    servicioIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id'
        },
    },
    equipoIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipo,
            key: 'id'
        },
    },
    usuarioIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        },
    },
}, {
    tableName: 'Reporte',
    timestamps: true,
});
Servicio.hasMany(Reporte, { foreignKey: 'servicioIdFk', as: 'reporte' });
Reporte.belongsTo(Servicio, { foreignKey: 'servicioIdFk', as: 'servicio' });

Equipo.hasMany(Reporte, { foreignKey: 'equipoIdFk', as: 'reporte' });
Reporte.belongsTo(Equipo, { foreignKey: 'equipoIdFk', as: 'equipo' });

Usuario.hasMany(Reporte, { foreignKey: 'usuarioIdFk', as: 'reporte' });
Reporte.belongsTo(Usuario, { foreignKey: 'usuarioIdFk', as: 'usuario' });

module.exports = Reporte;
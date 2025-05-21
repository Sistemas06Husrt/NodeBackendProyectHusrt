const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const Equipo = require('./Equipo');
const Usuario = require('./../generales/Usuario');
const Servicio = require('./../generales/Servicio');
 
const Reporte = sequelize.define('Reporte', {
    añoProgramado: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    mesProgramado: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fechaRealizado: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    horaTerminacion: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horaTotal: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    // Correctivo Activo y Correctivo Pasivo
    tipoMantenimiento: {
        type: DataTypes.ENUM('Correctivo', 'Preventivo', 'Predictivo'),
        allowNull: false
    },
    tipoFalla: {
        type: DataTypes.ENUM('Desgaste', 'Operacion Indevida', 'Causa Extera', 'Accesorios', 'Desconocido', 'sin Falla', 'Otros', 'No Registra'),
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
        allowNull: true,
    },
    nombreRecibio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cedulaRecibio: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
    },
    rutaPdf: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        allowNull: true,
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
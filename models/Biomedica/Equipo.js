const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');
const TipoEquipo = require('../Biomedica/TipoEquipo');
const Servicio = require('./Servicio');
const Sede = require('./Sede');
const Responsable = require('./Responsable');

const Equipo = sequelize.define('Equipo', {
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serie: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ubicacionEspecifica: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    periodicidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true,
    },
    estadoBaja: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    calibracion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    calificacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    validacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    tipoEquipoIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoEquipo,
            key: 'id'
        },
    },
    servicioIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id'
        },
    },
    sedeIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sede,
            key: 'id'
        },
    },
    responsableIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Responsable,
            key: 'id'
        },
    }
}, {
    tableName: 'equipos',
    timestamps: true,
});

Equipo.belongsTo(TipoEquipo, { foreignKey: 'tipoEquipoIdFk', as: 'tipoEquipos' });
TipoEquipo.hasMany(Equipo, { foreignKey: 'tipoEquipoIdFk', as: 'equipos' });

Equipo.belongsTo(Servicio, { foreignKey: 'servicioIdFk', as: 'servicios' });
Servicio.hasMany(Equipo, { foreignKey: 'servicioIdFk', as: 'equipos' });

Equipo.belongsTo(Sede, {foreignKey: 'sedeIdFk', as: 'sedes'});
Sede.hasMany(Equipo, {foreignKey: 'sedeIdFk', as: 'equipos'});

Equipo.belongsTo(Responsable, {foreignKey: 'responsableIdFk', as: 'responsables'});
Responsable.hasMany(Equipo, {foreignKey:'responsableIdFk', as: 'equipos'});

module.exports = Equipo;

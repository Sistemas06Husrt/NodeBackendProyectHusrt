const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const Equipo = require('./Equipo');
const Usuario = require('./../generales/Usuario');

const ActividadMetrologica = sequelize.define('ActividadMetrologica',{

    tipoActividad: {
        type: DataTypes.ENUM('Calibración', 'Calificación', 'Validación', 'Confirmación Metrológica'),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    empresa:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    errorMaximoIdentificado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resultado: {
        type: DataTypes.ENUM('Cumple', 'No Cumple', 'No Aplica'),
        allowNull: false,
    },
    rutaReporte:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    usuarioIdFk: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Usuario,
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
}, {
    tableName: 'actividadMetrologica',
    timestamps: true

});

Equipo.hasMany(ActividadMetrologica, { foreignKey: 'equipoIdFk', as: 'ActividadMetrologica' });
ActividadMetrologica.belongsTo(Equipo, { foreignKey: 'equipoIdFk', as: 'equipo' });

Usuario.hasMany(ActividadMetrologica, { foreignKey: 'usuarioIdFk', as: 'ActividadMetrologica' });
ActividadMetrologica.belongsTo(Usuario, { foreignKey: 'usuarioIdFk', as: 'usuarioAprobo' });


module.exports = ActividadMetrologica;
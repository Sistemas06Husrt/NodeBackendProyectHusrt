const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');

const DatosTecnicos = sequelize.define('DatosTecnicos', {

    vMaxOperacion: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    vMinOperacion: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    iMaxOperacion: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    iMinOperacion: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    wConsumida: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    frecuencia: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    presion: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    velocidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    temperatura: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    peso: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
    capacidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = DatosTecnicos;
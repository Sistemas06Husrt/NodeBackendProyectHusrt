const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');
const Equipo = require('./Equipo');

const ProgramacionMantenimiento = sequelize.define('ProgramacionMantenimiento', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    encargado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipoIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'equipos',
            key: 'id'
        },
    },
}, {
    tableName: 'programacionMantenimiento',
    timestamps: true,
}
);

ProgramacionMantenimiento.belongsTo(Equipo, {foreignKey: 'equipoIdFk', as: 'equipo'});
Equipo.hasMany(ProgramacionMantenimiento, {foreignKey: 'equipoIdFk', as: 'programacion'});


module.exports = ProgramacionMantenimiento;
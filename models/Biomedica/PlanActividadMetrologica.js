const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const Equipo = require('./Equipo');

const PlanActividadMetrologica = sequelize.define('PlanActividadMetrologica', {
    
    equipoIdFk: {
        type: DataTypes.INTEGER,
        references: { model: Equipo, key: 'id' },
        allowNull: false,
    },
    mes: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ano: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipoActividad: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { tableName: 'PlanActividadMetrologica', timestamps: true });

Equipo.hasMany(PlanActividadMetrologica, { foreignKey: 'equipoIdFk', as: 'planActividadMetrologica' });
PlanActividadMetrologica.belongsTo(Equipo, { foreignKey: 'equipoIdFk', as: 'equipo' });

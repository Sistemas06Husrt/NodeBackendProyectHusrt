const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');

const Responsable = sequelize.define('Responsable', {

    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    garantia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    externo: {
        type: DataTypes.BOOLEAN,
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
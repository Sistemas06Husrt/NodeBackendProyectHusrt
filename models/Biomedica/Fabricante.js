const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');

const Fabricante = sequelize.define('fabricante', {
    nombres: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = Fabricante;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Servicio = sequelize.define('Servicio', {
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'servicios',
    timestamps: true,
  });

  module.exports = Servicio;
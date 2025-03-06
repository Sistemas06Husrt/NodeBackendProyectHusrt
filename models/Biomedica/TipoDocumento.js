const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');

const TipoDocumento = sequelize.define('TipoDocumento', {
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'tipoDocumento',
    timestamps: true,
  });

  module.exports = TipoDocumento;
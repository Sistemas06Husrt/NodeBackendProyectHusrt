const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const TipoDocumento = require('../generales/TipoDocumento');
const Equipo =require('./Equipo')
const Documento = sequelize.define('Documento', {

  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: true,
  },
  equipoIdFk: {
    type: DataTypes.INTEGER,
    references: {
      model: Equipo,
      key: 'id'
    },
    allowNull: false,
  },
  tipoDocumntoIdFk: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoDocumento,
      key: 'id'
    },
    allowNull: false,
  },
}, {
  tableName: 'documentos',
  timestamps: true,
});

Equipo.hasMany(Documento, { foreignKey: 'equipoIdFk', as: 'documentos' });
Documento.belongsTo(Equipo, { foreignKey: 'equipoIdFk', as: 'equipo' });

TipoDocumento.hasMany(Documento, { foreignKey: 'tipoDocumntoIdFk', as: 'documentos' });
Documento.belongsTo(TipoDocumento, { foreignKey: 'tipoDocumntoIdFk', as: 'tipoDocumento' });

module.exports = Documento;
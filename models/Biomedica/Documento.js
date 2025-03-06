const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const TipoDocumento = require('./TipoDocumento');
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

TipoDocumento.hasMany(Documento, { foreignKey: 'tipoDocumentoIdFk', as: 'documentos' });
Documento.belongsTo(TipoDocumento, { foreignKey: 'tipoDocumentoIdFk', as: 'tipoDocumento' });


module.exports = Documento;
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const Reporte = require('../../models/Biomedica/Reporte');
const ProtocoloPreventivo = require('../../models/Biomedica/ProtocoloProventivo');

const CumplimientoProtocoloPreventivo = sequelize.define('CumpliminetoProtocoloPreventivo', {
    cumple: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    protocoloPreventivoIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProtocoloPreventivo,
            key: 'id'
        },
    },
    reporteIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Reporte,
            key: 'id'
        },
    }
});

CumplimientoProtocoloPreventivo.belongsTo(ProtocoloPreventivo, { foreignKey: 'protocoloPreventivoIdFk', as: 'protocolo' });
ProtocoloPreventivo.hasMany(CumplimientoProtocoloPreventivo, { foreignKey: 'protocoloPreventivoIdFk', as: 'cumplimientoProtocolo' });


module.exports = CumplimientoProtocoloPreventivo;

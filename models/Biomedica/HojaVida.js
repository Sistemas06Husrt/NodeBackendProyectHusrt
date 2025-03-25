const { DataTypes } = require('sequelize');
const sequelize = require('../../config/configDb');
const Equipo = require('./Equipo');

const HojaVida = sequelize.define('HojaVida', {
    anoIngreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contrato: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoAdquisicion: {
        type: DataTypes.ENUM('Compra', 'Convenio', 'Donado', 'AsignadoMinisterio', 'AsignadoGovernacion', 'Comodato'),
        allowNull: false
    },
    fechaCompra: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaInstalacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaIncorporacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaVencimientoGarantia: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    riesgo: {
        type: DataTypes.ENUM('NA', 'I', 'IIA', 'IIB', 'III', 'IV'),
        allowNull: false
    },
    fuente: {
        type: DataTypes.ENUM('Electricidad', 'Energia Solar', 'Agua', 'Gas', 'Vapor de agua', 'Derivados del petroleo', 'Otra'),
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('Medico', 'Basico', 'Apollo'),
        allowNull: false
    },
    tipoUso: {
        type: DataTypes.ENUM('Diagnostico', 'Tratamiento', 'Rehabilitacion', 'Prevencion', 'Analisis'),
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipoIdFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipo,
            key: 'id'
        },
    }
}, {
    tableName: 'hojavida',
    timestamps: true,
}
);

Equipo.hasOne(HojaVida, { foreignKey: 'equipoIdFk', as: 'hojaVida' });
HojaVida.belongsTo(Equipo, { foreignKey: 'equipoIdFk', as: 'equipo' });







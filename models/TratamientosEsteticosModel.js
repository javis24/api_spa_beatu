import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pacientes from "./PacientesModel.js";

const { DataTypes } = Sequelize;

const TratamientosEsteticos = db.define('tratamientos_esteticos', {
    pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pacientes,
            key: 'id'
        }
    },
    cavitation: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    radioFrequency: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lipoLaser: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    vacuum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    gluteCups: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    woodTherapy: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lymphaticDrainage: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    detox: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    mesotherapy: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    passiveGym: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    freezeTableName: true
});

TratamientosEsteticos.belongsTo(Pacientes, { foreignKey: 'pacienteId' });

export default TratamientosEsteticos;
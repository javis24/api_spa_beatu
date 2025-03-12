import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pacientes from "./PacientesModel.js";

const { DataTypes } = Sequelize;

const MetricasSalud = db.define('metricas_salud', {
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    fatPercentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    muscleKg: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    bodyWater: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    phy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    muscle: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    metabolicAge: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    heartRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    boneKg: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    visceralFat: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    bmi: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    hip: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    arms: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    thighs: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    calves: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    chest: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    waist: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    abdomen: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    kcla: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    pacienteUuid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pacientes,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
});

MetricasSalud.belongsTo(Pacientes, { foreignKey: 'pacienteUuid' });


export default MetricasSalud;
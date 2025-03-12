import db from '../config/Database.js'; 
import { Sequelize } from 'sequelize';
import Users from './UserModel.js'; 

const { DataTypes } = Sequelize;

const Pacientes = db.define('paciente', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true, 
        validate: { notEmpty: true },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100],
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    phoneNumber: { 
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isNumeric: true, 
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true },
    },
    evaluationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0 }, 
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: { min: 0 },
    },
    unwantedGain: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pathologies: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    lastActive: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
    },
}, {
    freezeTableName: true,
    timestamps: true,
});

Users.hasMany(Pacientes);
Pacientes.belongsTo(Users, { foreignKey: 'userId' }); 

export default Pacientes;
import { DataTypes } from 'sequelize';
import db from '../config/Database';

const {DataTypes} = Sequelize;
const Users = db.define('users', {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: { notEmpty: true }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: true,
        len: [3, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { 
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    role: {
      type: DataTypes.ENUM('admin', 'secretary', 'client'),
      allowNull: false,
      defaultValue: 'client'
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });

export default Users;
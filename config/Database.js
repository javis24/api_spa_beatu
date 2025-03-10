import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Importa el driver mysql2

const db = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectModule: mysql2, // Usa el driver importado
        logging: console.log,
    }
);

export default db;
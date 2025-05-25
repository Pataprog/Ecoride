import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST || 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false, // ou true pour voir les requêtes SQL
});
export default sequelize;

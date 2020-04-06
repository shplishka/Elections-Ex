import { Sequelize } from 'sequelize';

export const database = new Sequelize('node-complete', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

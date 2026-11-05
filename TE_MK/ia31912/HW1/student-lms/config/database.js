import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './students.sqlite',
    logging: false
});

export default sequelize;

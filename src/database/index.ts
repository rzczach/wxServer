import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // 加载环境变量
const sequelize = new Sequelize(
    process.env.DB_NAME ?? 'default_value_if_not_set',
    process.env.DB_USER ?? 'default_user',
    process.env.DB_PASSWORD ?? 'default_password',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // 可根据需求调整是否输出SQL语句
    },
);
// sequelize.modelManager; // 正确的访问方式
// sequelize.connectionManager;
// 同步模型到数据库，这将会创建表
sequelize.sync({ force: false, alter: true}).then(() => {
    console.log("Tables created successfully.");
}).catch((error) => {
    console.error("Unable to create tables : ", error);
});

export default sequelize;
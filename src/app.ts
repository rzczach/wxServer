import Koa from 'koa';
// import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import sequelize from './database/index'; // 引入数据库连接
// import userRoutes from './routers/users'; // 引入用户路由
import dotenv from 'dotenv';
import router from './routers/index';
dotenv.config();
const app = new Koa();
// const router = new Router();

// 中间件
app.use(bodyParser());

// // 注册路由
// router.use('/users', userRoutes.routes());

// 将路由添加到应用
app.use(router.routes()).use(router.allowedMethods());

app.use((context, next) => {
    if (context.body) {
        if (context.body.errcode === undefined) {
            const { message, ...other } = context.body;
            context.body = {
                code: 0,
                result: other,
            };

            if (message) context.body.message = message;
        }
        // 返回数据为 json 格式
        context.set('Content-Type', 'application/json');
        context.body = JSON.stringify(context.body);
    }
    return next();
});
// 启动数据库连接
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
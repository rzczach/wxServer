import Router from 'koa-router';
import { getUserListController, getUserByIdController, updateUserController, createUserController, deleteUserController } from '../controllers/usersController';
import { login } from '../controllers/login';


const pageRouter = new Router({
    prefix: '/users',
});

pageRouter.get('/login', login);
pageRouter.get('/list', getUserListController);
pageRouter.get('/info', getUserByIdController);
pageRouter.post('/update', updateUserController);
pageRouter.post('/create', createUserController);
pageRouter.post('/delete', deleteUserController);

// ... 更多路由配置

export default pageRouter;
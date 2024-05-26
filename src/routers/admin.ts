import Router from 'koa-router';
import { getUserListController, getUserByIdController, updateUserController, createUserController, deleteUserController } from '../controllers/adminController';
import { adminLogin } from '../controllers/adminLogin';


const pageRouter = new Router({
    prefix: '/admin',
});

pageRouter.get('/login', adminLogin);
pageRouter.get('/list', getUserListController);
pageRouter.get('/info', getUserByIdController);
pageRouter.post('/update', updateUserController);
pageRouter.post('/create', createUserController);
pageRouter.post('/delete', deleteUserController);

// ... 更多路由配置

export default pageRouter;
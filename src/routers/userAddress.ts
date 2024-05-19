

import Router from 'koa-router';
import {
    getUserAddressController,
    createUserAddressController,
    updateUserAddressController,
    deleteUserAddressController,
    getUserAddressByAddressIdController,
    getUserAddressByUserIdController,
} from '../controllers/userAddressController';


const pageRouter = new Router({
    prefix: '/address',
});
pageRouter.get('/list', getUserAddressController);
pageRouter.get('/infoByAddressId', getUserAddressByAddressIdController);
pageRouter.get('/infoByUserId', getUserAddressByUserIdController);
pageRouter.post('/update', updateUserAddressController);
pageRouter.post('/create', createUserAddressController);
pageRouter.post('/delete', deleteUserAddressController);

// ... 更多路由配置

export default pageRouter;
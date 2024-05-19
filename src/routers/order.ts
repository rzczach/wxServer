

import Router from 'koa-router';
import {
    getOrderController,
    createOrderController,
    updateOrderController,
    deleteOrderController,
    getOrderByOrderIdController,
    getOrderByUserIdController,
} from '../controllers/orderController';


const pageRouter = new Router({
    prefix: '/order',
});
pageRouter.get('/list', getOrderController);
pageRouter.get('/infoByOrderId', getOrderByOrderIdController);
pageRouter.get('/infoByUserId', getOrderByUserIdController);
pageRouter.post('/update', updateOrderController);
pageRouter.post('/create', createOrderController);
pageRouter.post('/delete', deleteOrderController);

// ... 更多路由配置

export default pageRouter;
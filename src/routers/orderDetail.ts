

import Router from 'koa-router';
import {
    getOrderDetailController,
    createOrderDetailController,
    updateOrderDetailController,
    deleteOrderDetailController,
    getOrderDetailByOrderIdController
   
} from '../controllers/orderDetailController';


const pageRouter = new Router({
    prefix: '/orderDetail',
});
pageRouter.get('/list', getOrderDetailController);
pageRouter.get('/infoByOrderId', getOrderDetailByOrderIdController);
pageRouter.post('/update', updateOrderDetailController);
pageRouter.post('/create', createOrderDetailController);
pageRouter.post('/delete', deleteOrderDetailController);

// ... 更多路由配置

export default pageRouter;


import Router from 'koa-router';
import {
    getShoppingCardController,
    createShoppingCardController,
    updateShoppingCardController,
    deleteShoppingCardController,
    getShoppingCardByCardIdController,
    getShoppingCardByUserIdController,
} from '../controllers/shoppingCart';


const pageRouter = new Router({
    prefix: '/cart',
});
pageRouter.get('/list', getShoppingCardController);
pageRouter.get('/infoByShoppingCardId', getShoppingCardByCardIdController);
pageRouter.get('/infoByUserId', getShoppingCardByUserIdController);
pageRouter.post('/update', updateShoppingCardController);
pageRouter.post('/create', createShoppingCardController);
pageRouter.post('/delete', deleteShoppingCardController);

// ... 更多路由配置

export default pageRouter;
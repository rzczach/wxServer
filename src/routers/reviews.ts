
import Router from 'koa-router';
import {  
    getReviewsController,
    getReviewsProductIdController,
    getReviewsByReviewIdController,
    updateReviewsController,
    createUserReviewsController,
    deleteReviewsController,} from '../controllers/userReviewsController';


const pageRouter = new Router({
    prefix: '/reviews',
});

pageRouter.get('/list', getReviewsController);
pageRouter.get('/infoByReviewId', getReviewsByReviewIdController);
pageRouter.get('/infoByProductId', getReviewsProductIdController);
pageRouter.post('/update', updateReviewsController);
pageRouter.post('/create', createUserReviewsController);
pageRouter.post('/delete', deleteReviewsController);

// ... 更多路由配置

export default pageRouter;
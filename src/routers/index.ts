import Router from 'koa-router';
import usersRouter from './users';
import productRouter from './product';
import messageRouter from './message';
import reviewsRouter from './reviews';
import orderRouter from './order';
import userAddressRouter from './userAddress';
import orderDetailRouter from './orderDetail';



const PROJECT = 'flower';
const VERSION = 'v1';

const router = new Router({
    prefix: `/${PROJECT}/${VERSION}`,
});

router.use(usersRouter.routes());
router.use(productRouter.routes());
router.use(messageRouter.routes());
router.use(reviewsRouter.routes());
router.use(orderRouter.routes());
router.use(userAddressRouter.routes());
router.use(orderDetailRouter.routes());


export default router;

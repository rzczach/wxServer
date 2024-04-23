import Router from 'koa-router';
import usersRouter from './users';



const PROJECT = 'flower';
const VERSION = 'v1';

const router = new Router({
    prefix: `/${PROJECT}/${VERSION}`,
});

router.use(usersRouter.routes());


export default router;

import Router from 'koa-router';
import { getProductController, createProductController, getProductByIdController, updateProductController, deleteProductController} from '../controllers/productController';


const pageRouter = new Router({
    prefix: '/product',
});

pageRouter.get('/list', getProductController);
pageRouter.get('/info', getProductByIdController);
pageRouter.post('/update', updateProductController);
pageRouter.post('/create', createProductController);
pageRouter.post('/delete', deleteProductController);

// ... 更多路由配置

export default pageRouter;
import Router from 'koa-router';
import {
    getMessageController,
    getMessageByProductIdController,
    getMessageByMessageIdController,
    createMessageController,
    updateMessageController,
    deleteMessageController,
} from '../controllers/messageController';


const pageRouter = new Router({
    prefix: '/message',
});

pageRouter.get('/list', getMessageController);
pageRouter.get('/infoByMessageId', getMessageByMessageIdController);
pageRouter.get('/infoByProductId', getMessageByProductIdController);
pageRouter.post('/update', updateMessageController);
pageRouter.post('/create', createMessageController);
pageRouter.post('/delete', deleteMessageController);

export default pageRouter;

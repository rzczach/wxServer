
import {
    findMessage,
    findMessageByProductId,
    findMessageByMessageId,
    updateMessage,
    createMessage,
    deleteMessage
} from '../models/message';



/* eslint-disable @typescript-eslint/naming-convention */
import { to } from '../../src/utils';


async function getMessageController(context: any, next: any) {
    const [error, res] = await to<any>(findMessage);
    if (error) {
        context.throw(error);
    }
    if (res) {
        console.log('res', res);
    }
    context.body = {
        list: res,
    };
    next();
}
async function getMessageByProductIdController(context: any, next: any) {
    const { productId } = context.request.query;
    console.log('productId', productId);
    const [error, res] = await to<any>(findMessageByProductId, productId);
    console.log('error', error);
    if (res) {
        context.body = {
            info: res,
        };
    } else {
        context.throw(res);
    }
    next();
}
async function getMessageByMessageIdController(context: any, next: any) {
    const { messageId } = context.request.query;
    console.log('messageId', messageId);
    const [error, res] = await to<any>(findMessageByMessageId, messageId);
    console.log('error', error);
    if (res) {
        context.body = {
            info: res,
        };
    } else {
        context.throw(res);
    }
    next();
}
async function updateMessageController(context: any, next: any) {
    const { messageId, content } = context.request.body;
    if (!messageId) {
        context.throw('缺少Id');
    }
    const res = await updateMessage(messageId, content);
    console.log('res', res);
    if (res) {
        context.body = {
            data: res,
        };
    } else {
        context.throw(res);
    }
    next();
}
async function createMessageController(context: any, next: any) {

    const { productId, content, ...rest } = context.request.body;

    if (!productId) {
        context.throw(new Error('未填写商品id'));
    }

  
    if (rest.messageId) {
        const messageInfo = await findMessageByMessageId(rest.messageId);
        if (messageInfo) {
            const result = await updateMessage(rest.messageId, content);
            context.body = {
                message: result ? '已有留言修改成功' : '已有留言修改失败',
                data: true,
            };
        }
    } else {
        const result = await findMessageByProductId(productId);
        console.log('result', result);
        if (result) {
            const res = await createMessage(productId, content);
            if (!res) {
                context.throw('新增错误');
            }
            context.body = {
                message: '新增成功',
                data: true,
            };
        } else {
            context.body = {
                message: '没有此商品',
                data: false,
            };
           
        }

    }
    
    next();
}
async function deleteMessageController (context: any, next: any) {
    const { messageId, postData, ...rest } = context.request.body;
    if (!messageId) {
        context.throw(new Error('缺少商品messageId'));
    }
    
    const res = await deleteMessage(messageId);
    if (res) {
       
        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getMessageController,
    getMessageByProductIdController,
    getMessageByMessageIdController,
    createMessageController,
    updateMessageController,
    deleteMessageController,
}



/* eslint-disable @typescript-eslint/naming-convention */
import { to } from '../utils';
import {
    findShoppingCard,
    findShoppingCardByUserId,
    findShoppingCardByCardId,
    updateShoppingCard,
    createShoppingCard,
    deleteShoppingCard
} from '../models/shoppingCart';

async function getShoppingCardController(context: any, next: any) {
    const [error, res] = await to<any>(findShoppingCard);
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
async function getShoppingCardByUserIdController(context: any, next: any) {
    const { userId } = context.request.query;
    console.log('productId', userId);
    const [error, res] = await to<any>(findShoppingCardByUserId, userId);
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
async function getShoppingCardByCardIdController(context: any, next: any) {
    const { cartId } = context.request.query;
    console.log('cartId', cartId);
    const [error, res] = await to<any>(findShoppingCardByCardId, cartId);
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
async function updateShoppingCardController(context: any, next: any) {
    const { cartId, ...rest } = context.request.body;
    if (!cartId) {
        context.throw('缺少Id');
    }
    const res = await updateShoppingCard(cartId, rest);
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
async function createShoppingCardController(context: any, next: any) {

    const { userId,productId,quantity, ...rest } = context.request.body;
    console.log('context.request.body', context.request.body);

    if (!userId) {
        context.throw(new Error('缺少用户信息'));
    }

    const params = {
        userId,
        productId,
        quantity,
        ...rest
    };
    
        const res = await createShoppingCard(params);

        if (!res) {
            context.throw('新增错误');
        }
    

    context.body = {
        message: '加入成功',
        data: true,
    };
    next();
}
async function deleteShoppingCardController (context: any, next: any) {
    const { cartId, postData, ...rest } = context.request.body;
    if (!cartId) {
        context.throw(new Error('缺少商品orderId'));
    }
    
    const res = await deleteShoppingCard(cartId);
    if (res) {
       
        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getShoppingCardController,
    createShoppingCardController,
    updateShoppingCardController,
    deleteShoppingCardController,
    getShoppingCardByCardIdController,
    getShoppingCardByUserIdController,
}



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
import {
    findProductById
} from '../models/productModel';
import { ShoppingCardData } from 'src/types/shoppingCart';
import { ProductInfo } from 'src/types/product';

async function getShoppingCardController(context: any, next: any) {
    try {
        const { userId } = context.request.query;
        const shoppingCards = await findShoppingCardByUserId(userId);

        if (shoppingCards && shoppingCards.length > 0) {
            // 收集包含cartId和productId的查询Promise
            const productPromisesWithCartIds = shoppingCards.map(async (card) => {
                const product = await findProductById(card.productId);
                // 将cartId与product信息合并
                return {
                    ...product,
                    selected: false,
                    cartId: card.cartId, // 添加cartId字段
                };
            });

            // 等待所有查询完成
            const productsWithCartIds = await Promise.all(productPromisesWithCartIds);

            context.body = {
                list: productsWithCartIds,
            };
        } else {
            context.body = {
                list: [],
            };
        }
    } catch (err) {
        context.throw(err); // 捕获并抛出任何错误给上下文处理器
    } finally {
        next(); // 确保next()在所有情况下都被调用
    }
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

    const { userId, productId, quantity, ...rest } = context.request.body;
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
    console.log('res', res);
    if (!res) {
        context.throw('新增错误');
    }


    context.body = {
        message: '加入成功',
        data: true,
    };
    next();
}
async function deleteShoppingCardController(context: any, next: any) {
    const { cartIds, postData, ...rest } = context.request.body;
    console.log('context.request.body', context.request.body);
    if (!cartIds) {
        context.throw(new Error('缺少商品orderId'));
    }
   
    const productPromisesWithCartIds = cartIds.map(async (cartId: number) => {
        const product = await deleteShoppingCard(cartId);
        // 将cartId与product信息合并
        return {
            ...product,
          
        };
    });
   
    if (productPromisesWithCartIds) {

        context.body = {
            message: '删除成功',
            flag: true,
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
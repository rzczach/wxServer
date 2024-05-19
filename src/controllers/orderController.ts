


/* eslint-disable @typescript-eslint/naming-convention */
import { DeliveryStatus, OrderStatus } from '../types/order';
import { generateOrderNo, to } from '../../src/utils';
import {
    findOrder,
    findOrderByUserId,
    findOrderByOrderId,
    updateOrder,
    createOrder,
    deleteOrder
} from '../models/order';

async function getOrderController(context: any, next: any) {
    const res = await findOrder();
    if (res) {
        context.body = {
            list: res,
        };
    } else {
        context.body = {
            list: [],
        };
    }
    next();
}
async function getOrderByUserIdController(context: any, next: any) {
    const { userId } = context.request.query;
    console.log('productId', userId);
    const [error, res] = await to<any>(findOrderByUserId, userId);
    console.log('error', error);
    if (res) {
        context.body = {
            info: res,
        };
    } else {
        context.body = {
            info: [],
        };
    }
    next();
}
async function getOrderByOrderIdController(context: any, next: any) {
    const { orderId } = context.request.query;
    console.log('productId', orderId);
    const [error, res] = await to<any>(findOrderByOrderId, orderId);
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
async function updateOrderController(context: any, next: any) {
    const { orderId, ...rest } = context.request.body;
    if (!orderId) {
        context.throw('缺少Id');
    }
    const res = await updateOrder(orderId, rest);
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
async function createOrderController(context: any, next: any) {

    const { userId,totalPrice,paymentMethod, deliveryAddress, deliveryStatus,productId, ...rest } = context.request.body;
    console.log('context.request.body', context.request.body);

    if (!userId || !productId) {
        context.throw(new Error('缺少用户信息 | 商品信息'));
    }

    const params = {
        userId: Number(userId),
        totalPrice: Number(totalPrice),
        productId: Number(productId),
        paymentMethod,
        deliveryAddress,
        deliveryStatus: DeliveryStatus.Pending,
        orderNo: generateOrderNo(),
        orderStatus: OrderStatus.Paid,
        ...rest
    };
    
        const res = await createOrder(params);

        if (res) {
            context.body = {
                message: '订单创建成功',
                data: true,
            };
        }
    

    
    next();
}
async function deleteOrderController (context: any, next: any) {
    const { orderId, postData, ...rest } = context.request.body;
    if (!orderId) {
        context.throw(new Error('缺少商品orderId'));
    }
    
    const res = await deleteOrder(orderId);
    if (res) {
       
        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getOrderController,
    createOrderController,
    updateOrderController,
    deleteOrderController,
    getOrderByOrderIdController,
    getOrderByUserIdController,
}
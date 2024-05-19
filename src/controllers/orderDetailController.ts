


/* eslint-disable @typescript-eslint/naming-convention */
import { DeliveryStatus } from '../types/order';
import { to } from '../utils';
import {
    findOrderDetail,
    findOrderDetailByOrderId,
    updateOrderDetail,
    createOrderDetail,
    deleteOrderDetail
} from '../models/orderDetail';

async function getOrderDetailController(context: any, next: any) {
    const [error, res] = await to<any>(findOrderDetail);
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

async function getOrderDetailByOrderIdController(context: any, next: any) {
    const { orderId } = context.request.query;
    console.log('orderId', orderId);
    const [error, res] = await to<any>(findOrderDetailByOrderId, orderId);
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
async function updateOrderDetailController(context: any, next: any) {
    const { orderId, ...rest } = context.request.body;
    if (!orderId) {
        context.throw('缺少Id');
    }
    const res = await updateOrderDetail(orderId, rest);
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
async function createOrderDetailController(context: any, next: any) {

    const { orderId, productId, quantity, unitPrice, discount, ...rest } = context.request.body;
    console.log('context.request.body', context.request.body);

    if (!orderId) {
        context.throw(new Error('缺少订单信息'));
    }

    const params = {

        orderId,
        productId,
        quantity,
        unitPrice,
        discount,

        ...rest
    };

    const res = await createOrderDetail(params);

    if (!res) {
        context.throw('新增错误');
    }


    context.body = {
        message: '订单创建成功',
        data: true,
    };
    next();
}
async function deleteOrderDetailController(context: any, next: any) {
    const { orderId, postData, ...rest } = context.request.body;
    if (!orderId) {
        context.throw(new Error('缺少商品orderId'));
    }

    const res = await deleteOrderDetail(orderId);
    if (res) {

        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getOrderDetailController,
    getOrderDetailByOrderIdController,
    createOrderDetailController,
    updateOrderDetailController,
    deleteOrderDetailController,
}



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
import {
    findOrderDetail,
    findOrderDetailByOrderId,
    updateOrderDetail,
    createOrderDetail,
    deleteOrderDetail
} from '../models/orderDetail';
import { findProductById } from '../models/productModel';

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

    const res = await findOrderByUserId(userId);

    if (res) {
        const dataPromises = res.map(async (d) => {
            let orderList = await findOrderDetailByOrderId(d.orderId);
            const newOrderListPromise = orderList!.map(async (v) => {

                const productInfo = await findProductById(v.productId);
                return { ...v, ...productInfo };
            })
            const newOrderList = await Promise.all(newOrderListPromise);
            return {
                ...d,
                orderList: newOrderList || []
            }
        });
        // 等待所有查询完成
        const data = await Promise.all(dataPromises);
        context.body = {
            list: data,
        };
    } else {
        context.body = {
            list: [],
        };
    }
    next();
}
async function getOrderByOrderIdController(context: any, next: any) {
    const { orderId } = context.request.query;
    const [error, res] = await to<any>(findOrderByOrderId, orderId);
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

    // 解构请求体中的数据
    const { userId, totalPrice, paymentMethod, deliveryAddress, cardMessage, productList, userMessage, addressId, buyUserName, buyPhoneNumber } = context.request.body;
    if (!userId) {
        context.throw(new Error('缺少用户信息 | 商品信息'));
    }

    const params = {
        userId: Number(userId),
        totalPrice: Number(totalPrice),
        userMessage,
        cardMessage,
        paymentMethod: '微信',
        deliveryAddress,
        buyUserName,
        buyPhoneNumber,
        addressId,
        deliveryStatus: DeliveryStatus.Pending,
        orderNo: generateOrderNo(),
        orderStatus: OrderStatus.Paid,
    };

    const res = await createOrder(params);

    if (res) {
        for (const item of productList) {
            const { productId, quantity = 1, price } = item;
            // 确认商品存在（可选，根据业务逻辑决定是否验证）


            // 创建订单商品详情
            const a = await createOrderDetail({
                orderId: res.orderId,
                productId,
                quantity,
                unitPrice: price,

            });
        }
        context.body = {
            message: '订单创建成功',
            data: true,
        };
    }
    next();
}
async function deleteOrderController(context: any, next: any) {
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
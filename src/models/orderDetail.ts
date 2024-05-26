import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { OrderDetailData } from '../types/orderDetail';
import { Order } from './order';
import { Product } from './productModel';

// 定义 OrderDetails 模型
const OrderDetail = sequelize.define('OrderDetails', {
    orderDetailId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order, // 假设 Orders 是订单表的模型名称
            key: 'orderId', // 关联的外键字段
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // 假设 FlowerProducts 是商品表的模型名称
            key: 'productId', // 关联的外键字段
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
}, {
    tableName: 'orderDetail',
    timestamps: true,
});
Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

// 查找所有
async function findOrderDetail(): Promise<OrderDetailData[]> {
    const result = await OrderDetail.findAll();
    if (!result) {
        return Promise.reject('err');
    }

    const list = result.map((d) => {
        return d.toJSON();
    })
    return list;
}


async function findOrderDetailByOrderId(orderId: number): Promise<OrderDetailData[] | null> {
    const id = Number(orderId);
    const messages = await OrderDetail.findAll({
        where: { orderId: id },
    });
    return messages ? messages.map((d) => {
        return d.toJSON();
    }) : null;
}

// 修改某个 根
async function updateOrderDetail(orderId: number, newContent: Partial<OrderDetailData>) {
    try {
        const id = Number(orderId);

        const [affectedCount] = await OrderDetail.update({ content: newContent }, {
            where: { orderId: id },
        }).catch(error => {
            console.error('Error updating product:', error);
            throw error; // 重新抛出异常，以便上层可以捕获
        });
        return affectedCount > 0;
    } catch (err) {
        return err;
    }
}
// 新增
async function createOrderDetail(orderData: Partial<OrderDetailData>): Promise<OrderDetailData> {
    const newOrderDetail = await OrderDetail.create({
        ...orderData,
    });
    return newOrderDetail.toJSON();
}
// 删除用户
async function deleteOrderDetail(orderId: number): Promise<any> {
    const info = await findOrderDetailByOrderId(orderId);
    if (info) {
        const res = OrderDetail.destroy({
            where: { messageId: orderId },
        });
        console.log(res);
        return {
            flag: true,
            message: '删除成功'
        };
    }
    return {
        flag: false,
        message: '未找到用户'
    }
}
export {
    OrderDetail,
    findOrderDetail,
    findOrderDetailByOrderId,
    updateOrderDetail,
    createOrderDetail,
    deleteOrderDetail
}
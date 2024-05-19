import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { OrderData } from 'src/types/order';
import { Users } from './userModel';
import { Product } from './productModel';
import { UserAddress } from './userAddress';

// 定义 Order 模型
const Order = sequelize.define('Order', {
    orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // NOT NULL
        references: {
            model: Users, // 假设 Users 模型已定义
            key: 'userId'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false, // NOT NULL
        references: {
            model: Product, // 商品信息
            key: 'productId'
        }
    },
    orderNo: {
        type: DataTypes.STRING(50),
        // unique: true // UNIQUE
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // DEFAULT CURRENT_TIMESTAMP
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false // NOT NULL
    },
    paymentMethod: {
        type: DataTypes.STRING(50),
    },
    deliveryAddress: {
        type: DataTypes.STRING(200),
        allowNull: true // NOT NULL
    },
    materialText: {
        type: DataTypes.STRING(200),
        allowNull: true // NOT NULL
    },
    packing: {
        type: DataTypes.STRING(200),
        allowNull: true // NOT NULL
    },
    deliveryStatus: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
        defaultValue: 'Pending' // DEFAULT 'Pending'
    },
    orderStatus: {
        type: DataTypes.ENUM('Unpaid', 'Paid', 'Completed', 'Cancelled'),
        defaultValue: 'Unpaid' // DEFAULT 'Unpaid'
    },
    shippingAddressId: {
        type: DataTypes.STRING || DataTypes.INTEGER,
        references: {
            model: UserAddress, // 假设 UserAddresses 模型已定义
            key: 'addressId'
        }
    }
}, {
    tableName: 'order',
    timestamps: false, // 保持timestamps为true以启用createdAt和updatedAt
    createdAt: 'orderDate', // 将createdAt映射到createTime字段
    updatedAt: true,
});

// 查找所有
async function findOrder(): Promise<OrderData[] | undefined> {
    try {
        const result = await Order.findAll();
        if (result) {
            const list = result.map((d) => {
                return d.toJSON();
            })
            return list;
        } else {
            return []
        }
    } catch (e) {
        console.log(e)
    }

}


// 查找某个 
async function findOrderByUserId(userId: number): Promise<OrderData[] | null> {
    const id = Number(userId);
    const messages = await Order.findAll({
        where: { userId: id },
    });
    console.log('messages', messages);
    return messages.length ? messages.map(message => message.toJSON()) : null;
}
async function findOrderByOrderId(orderId: number): Promise<OrderData[] | null> {
    const id = Number(orderId);
    const messages = await Order.findOne({
        where: { orderId: id },
    });
    return messages ? messages.toJSON() : null;
}

// 修改某个 根
async function updateOrder(orderId: number, newContent: Partial<OrderData>) {
    try {
        const id = Number(orderId);

        const [affectedCount] = await Order.update({ content: newContent }, {
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
async function createOrder(orderData: Partial<OrderData>): Promise<OrderData | undefined> {
    console.log('orderData', orderData);
    try {
        const newOrder = await Order.create(orderData);
        console.log('newOrder', newOrder);
        return newOrder.toJSON();
    } catch (error) {
        console.error('创建订单时发生错误:', error);
    }

}

// 删除用户
async function deleteOrder(orderId: number): Promise<any> {
    const info = await findOrderByOrderId(orderId);
    if (info) {
        const res = Order.destroy({
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
    Order,
    findOrder,
    findOrderByUserId,
    findOrderByOrderId,
    updateOrder,
    createOrder,
    deleteOrder
}
import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { ShoppingCardData } from 'src/types/shoppingCart';
import { Users } from './userModel';
import { Product } from './productModel';

// 定义 ShoppingCard 模型
const ShoppingCard = sequelize.define('ShoppingCard', {
    cartId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // 引用 Users 模型
            key: 'userId', // 关联字段名，假设为 userId
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // 引用 FlowerProducts 模型
            key: 'productId', // 关联字段名，假设为 productId
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    addedTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    tableName: 'shoppingCard',
    timestamps: true, // 如果你的表没有 createdAt 和 updatedAt 字段，请设置为 false
    createdAt: 'addedTime',
});

// 查找所有
async function findShoppingCard(): Promise<ShoppingCardData[]> {
    const result = await ShoppingCard.findAll();
    if (!result) {
        return Promise.reject('err');
    }

    const list = result.map((d) => {
        return d.toJSON();
    })
    return list;
}


// 查找某个 
async function findShoppingCardByUserId(userId: number): Promise<ShoppingCardData[] | null> {
    const id = Number(userId);
    const messages = await ShoppingCard.findAll({
        where: { userId: id },
    });
    console.log('messages', messages);
    return messages.length ? messages.map(message => message.toJSON()) : null;
}
async function findShoppingCardByCardId(cartId: number): Promise<ShoppingCardData[] | null> {
    const id = Number(cartId);
    const messages = await ShoppingCard.findOne({
        where: { cartId: id },
    });
    return messages ? messages.toJSON() : null;
}

// 修改某个 根
async function updateShoppingCard(cartId: number, newContent: Partial<ShoppingCardData>) {
    try {
        const id = Number(cartId);

        const [affectedCount] = await ShoppingCard.update({ content: newContent }, {
            where: { cartId: id },
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
async function createShoppingCard(orderData: ShoppingCardData): Promise<ShoppingCardData | undefined> {
    try {
        const newShoppingCard = await ShoppingCard.create({
            ...orderData,
        });
        console.log('newShoppingCard', newShoppingCard);
        return newShoppingCard.toJSON();
    } catch (e) {
        console.log(e);
    }
}
// 删除用户
async function deleteShoppingCard(cartId: number): Promise<any> {
    const info = await findShoppingCardByCardId(cartId);
    if (info) {
        const res = await ShoppingCard.destroy({
            where: { cartId: cartId },
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
    ShoppingCard,
    findShoppingCard,
    findShoppingCardByUserId,
    findShoppingCardByCardId,
    updateShoppingCard,
    createShoppingCard,
    deleteShoppingCard
}
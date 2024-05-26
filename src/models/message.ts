import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { Product } from './productModel';
import { MessageData } from 'src/types/message';


const Message = sequelize.define('Message', {
    messageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product, // 这里引用的是 Message 模型
            key: 'productId', // 对应 Message 模型中的 productId 字段
        },
        onDelete: 'CASCADE', // 当删除关联的商品时，也删除这些留言
        onUpdate: 'CASCADE', // 更新商品时，留言的关联也跟着更新
    },
    content: {
        type: DataTypes.TEXT, // 使用 TEXT 类型以适应不同长度的留言内容
    },
}, {
    tableName: 'message', // 指定表名
    timestamps: true, // 如果需要自动管理创建和更新时间，可以开启
    createdAt: 'createTime',
    updatedAt: 'updateTime',
});
// 查找所有商品
async function findMessage(): Promise<MessageData[]> {
    const result = await Message.findAll();
    if (!result) {
        return Promise.reject('err');
    }

    const list = result.map((d) => {
        return d.toJSON();
    })
    return list;
}


// 查找某个 商品下的留言
async function findMessageByProductId(productId: number): Promise<MessageData[] | null> {
    const id = Number(productId);
    const messages = await Message.findAll({
        where: { productId: id },
    });
    return messages.length ?  messages.map(message => message.toJSON()) : null;
}
async function findMessageByMessageId(messageId: number): Promise<MessageData[] | null> {
    const id = Number(messageId);
    const messages = await Message.findOne({
        where: { messageId: id },
    });
    return messages ? messages.toJSON() : null;
}

// 修改某个 根
async function updateMessage(messageId: number, newContent: Partial<MessageData>) {
    try {
        const id = Number(messageId);

        const [affectedCount] = await Message.update({ content: newContent }, {
            where: { messageId: id },
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
async function createMessage(productId: number, content: string): Promise<MessageData> {
    const newMessage = await Message.create({
        productId: productId,
        content: content,
    });
    return newMessage.toJSON();
}
// 删除用户
async function deleteMessage(messageId: number): Promise<any> {
    const info = await findMessageByMessageId(messageId);
    if (info) {
        const res = Message.destroy({
            where: { messageId: messageId },
        });
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
    Message,
    findMessage,
    findMessageByProductId,
    findMessageByMessageId,
    updateMessage,
    createMessage,
    deleteMessage
}
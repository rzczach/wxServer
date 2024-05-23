import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { Users } from './userModel';
import { UserAddressData } from '../types/userAddress';

// 定义 UserAddress 模型
const UserAddress = sequelize.define('UserAddresses', {
    addressId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // 假设 Users 是 Users 表的模型名
            key: 'userId', // 注意这里的键名应与 Users 模型中定义的主键名匹配
        },
    },
    addressTitle: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    recipientName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING(50),
    },
    streetAddress: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING(20),
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    creationTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    lastUpdateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    timestamps: true, // 因为我们自定义了时间戳字段，所以禁用默认的时间戳行为
    freezeTableName: true, // 防止Sequelize自动将表名转换为复数形式
    createdAt: 'creationTime', // 将createdAt映射到createTime字段
    updatedAt: 'lastUpdateTime', // 更正updatedAt映射到一个不同的字段，避免与uploadTime混淆
});

// 查找所有
async function findUserAddress(): Promise<UserAddressData[]> {
    const result = await UserAddress.findAll();
    if (!result) {
        return Promise.reject('err');
    }

    const list = result.map((d) => {
        return d.toJSON();
    })
    return list;
}


// 查找某个 
async function findUserAddressByUserId(userId: number): Promise<UserAddressData[] | null> {
    const id = Number(userId);
    const messages = await UserAddress.findAll({
        where: { userId: id },
    });
   
    return messages.length ? messages.map(message => message.toJSON()) : null;
}
async function findUserAddressByAddressId(addressId: number): Promise<UserAddressData[] | null> {
    const id = Number(addressId);
    const messages = await UserAddress.findOne({
        where: { addressId: id },
    });
    return messages ? messages.toJSON() : null;
}

// 修改某个 根
async function updateUserAddress(addressId: number, newContent: Partial<UserAddressData>) {
    try {
        const id = Number(addressId);

        const [affectedCount] = await UserAddress.update({ content: newContent }, {
            where: { addressId: id },
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
async function createUserAddress(orderData: UserAddressData): Promise<UserAddressData> {
    const newUserAddress = await UserAddress.create({
        ...orderData,
    });
    return newUserAddress.toJSON();
}
// 删除用户
async function deleteUserAddress(addressId: number): Promise<any> {
    const info = await findUserAddressByAddressId(addressId);
    if (info) {
        const res = UserAddress.destroy({
            where: { addressId: addressId },
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
    UserAddress,
    findUserAddress,
    findUserAddressByUserId,
    findUserAddressByAddressId,
    updateUserAddress,
    createUserAddress,
    deleteUserAddress
}
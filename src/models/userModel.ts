import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例

export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    password: string;
    phoneNumber: number;
    shippingAddressID: number;
    profileImage: number;
    registrationTime: Date;
    lastLoginTime: Date;
}
const Users = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: {
        type: DataTypes.STRING(20), // 或者适合你需求的长度
        allowNull: false, // 根据实际情况
    },
    shippingAddressID: DataTypes.INTEGER,
    profileImage: DataTypes.STRING,
    registrationTime: DataTypes.DATE,
    lastLoginTime: DataTypes.DATE,
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'registrationTime',
    updatedAt: false,
});
// 查找所有用户
async function findUsers(): Promise<UserInfo[]> {
    const result = await Users.findAll();
    if (!result) {
        return Promise.reject('err');
    }

    const list = result.map((d) => {
        return d.toJSON();
    })
    return list;
}

// 通过用户id查找某个用户
async function findUserById(userId: number): Promise<UserInfo | null> {
    try {
        const id = Number(userId);
        const userInstance = await Users.findOne({
            where: { userId: id },
        });
        return userInstance ? userInstance.toJSON() : null;
    } catch (err) {
        console.log(err);
        return null
    }
}
// 通过手机号查找某个用户
async function findUserByphone(phoneNumber: number): Promise<UserInfo | null> {
    const phone = Number(phoneNumber);
    const userInstance = await Users.findOne({
        where: { phoneNumber: phone },
    });
    return userInstance ? userInstance.toJSON() : null;
}

// 修改某个用户
async function updateUser(userId: number, userData: Partial<UserInfo>) {
    try {
        const id = Number(userId);
        // 如果 affectedCount 的值为1，这意味着有一条匹配userId的用户记录被成功更新。
        // 如果为0，则表示没有找到与指定userId匹配的记录进行更新。
        // 如果大于1，这通常意味着数据库中可能有多个记录匹配了给定的userId（这在使用唯一标识符作为更新条件时通常不应该发生，除非数据不一致）。
        const [affectedCount] = await Users.update(userData, {
            where: { userId: id },
        }).catch(error => {
            console.error('Error updating user:', error);
            throw error; // 重新抛出异常，以便上层可以捕获
        });
        return affectedCount > 0;
    } catch (err) {
        return err;
    }
}

// 新增用户
async function createUser(newUser: Omit<UserInfo, 'userId'>): Promise<UserInfo> {
    const createdUser = await Users.create(newUser);
    return createdUser.toJSON();
}

// 删除用户
async function deleteUser(userId: number): Promise<any> {
    const info = await findUserById(userId);
    if (info) {
        const res = Users.destroy({
            where: { userId },
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
    Users,
    findUsers,
    findUserById,
    updateUser,
    createUser,
    deleteUser,
    findUserByphone,
};

// 根据现有代码，请实现 查找某个用户、修改某个用户、新增用户、删除用户
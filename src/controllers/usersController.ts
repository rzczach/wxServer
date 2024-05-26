/* eslint-disable @typescript-eslint/naming-convention */
import { to } from '../../src/utils';
import {
    findUsers,
    findUserById,
    findUserByphone,
    updateUser,
    createUser,
    deleteUser,
} from '../models/userModel';

async function getUserListController(context: any, next: any) {
    const [error, res] = await to<any>(findUsers);
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

async function getUserByIdController(context: any, next: any) {
    const { userId } = context.request.query;
    const res = await findUserById(userId);

    if (res?.userId) {

        context.body = {
            ...res,
            message: '查询成功'
        };
    } else {
        context.body = {
            ...res,
            message: '查询失败'
        };
    }
    next();
}

async function getUserByPhoneController(context: any, next: any) {
    const { phoneNumber } = context.request.query;
    const [error, res] = await to<any>(findUserByphone, phoneNumber);
    if (res) {
        context.body = {
            info: res,
        };
    } else {
        context.throw(res);
    }
    next();
}

async function updateUserController(context: any, next: any) {
    const { userId, ...rest } = context.request.body;
    if (!userId) {
        context.throw('缺少用户id');
    }
    const res = await updateUser(userId, rest);
    if (res) {
        context.body = {
            data: res,
            message: '修改成功',
        };
    } else {

        context.throw(res);
    }
    next();
}
async function createUserController(context: any, next: any) {
    const { username, password, phoneNumber, email, profileImage, ...rest } = context.request.body;
    if (!phoneNumber) {
        context.throw(new Error('未填写用户信息'));
    }

    const params = {
        username,
        password,
        phoneNumber,
        email,
        profileImage,
        ...rest
    };

    const userInfo = await findUserByphone(phoneNumber);
    if (userInfo) {
        const result = await updateUser(rest.userId, params);
        context.body = {
            message: '此手机号已注册',
            data: false,
        };
    }
    else {
        const res = await createUser(params);
        if (!res) {
            context.throw('新增错误');
        }
        context.body = {
            message: '新增成功',
            data: true,
        };
    }

    next();
}

async function deleteUserController(context: any, next: any) {
    const { id, postData, ...rest } = context.request.body;
    if (!id) {
        context.throw(new Error('缺少用户id'));
    }

    const res = await deleteUser(id);
    if (res) {

        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}

export {
    getUserListController,
    getUserByIdController,
    updateUserController,
    createUserController,
    deleteUserController,
    getUserByPhoneController
};

/* eslint-disable @typescript-eslint/naming-convention */
// import { to } from 'ks-utils';
import { to } from '../../src/utils';
import {
    findUsers,
    findUserById,
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
    const { id } = context.request.query;
    console.log('id', id);
    const [error, res] = await to<any>(findUserById, id);
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

async function updateUserController(context: any, next: any) {
    const { id, ...rest } = context.request.body;
    if (!id) {
        context.throw('缺少Id');
    }
    const res = await updateUser(id, rest);
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
async function createUserController(context: any, next: any) {

    const { username, password, phoneNumber, email, profileImage, ...rest } = context.request.body;
    if (!username) {
        context.throw(new Error('未填写用户名称'));
    }

    const params = {
        username,
        password,
        phoneNumber,
        email,
        profileImage,
        ...rest
    };
    if (rest.userId) {
        const userInfo = await findUserById(rest.userId);
        if (userInfo) {
            const result = await updateUser(rest.userId, params);
            context.body = {
                message: result ? '已有用户修改成功': '已有用户修改失败',
                data: true,
            };
        }
    } else {

        const res = await createUser(params);
    
        if (!res) {
            context.throw('新增错误');
        }
    }
    
    context.body = {
        message: '新增成功',
        data: true,
    };
    next();
}

async function deleteUserController (context: any, next: any) {
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
//     const [error, res] = await to<CreatePage>(updatePage, params);

//     if (error) {
//         context.throw(error);
//     }

//     const pageId = res.insertedId;
//     context.body = {
//         message: '修改页面成功！',
//         id: pageId,
//     };
//     next();
// }

// async function deletePageController(context, next) {
//     const { _id } = context.request.body;
//     const params = { _id: new ObjectID(_id) };
//     const [error] = await to(deletePage, params);

//     if (error) {
//         context.throw(error);
//     }

//     context.body = {
//         message: '页面删除成功！',
//     };
//     next();
// }

export {
    getUserListController,
    getUserByIdController,
    updateUserController,
    createUserController,
    deleteUserController
};

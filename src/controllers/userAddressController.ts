
import { to } from '../../src/utils';
import {
    findUserAddress,
    findUserAddressByUserId,
    findUserAddressByAddressId,
    updateUserAddress,
    createUserAddress,
    deleteUserAddress
} from '../models/userAddress';

async function getUserAddressController(context: any, next: any) {
    const [error, res] = await to<any>(findUserAddress);
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
async function getUserAddressByUserIdController(context: any, next: any) {
    const { userId } = context.request.query;
    console.log('productId', userId);
    const [error, res] = await to<any>(findUserAddressByUserId, userId);
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
async function getUserAddressByAddressIdController(context: any, next: any) {
    const { addressId } = context.request.query;
    console.log('addressId', addressId);
    const [error, res] = await to<any>(findUserAddressByAddressId, addressId);
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
async function updateUserAddressController(context: any, next: any) {
    const { addressId, ...rest } = context.request.body;
    if (!addressId) {
        context.throw('缺少Id');
    }
    const res = await updateUserAddress(addressId, rest);
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
async function createUserAddressController(context: any, next: any) {

    const { userId,addressTitle,recipientName, phoneNumber, province,city,district,streetAddress,zipCode,isDefault, ...rest } = context.request.body;
    console.log('context.request.body', context.request.body);

    if (!userId) {
        context.throw(new Error('缺少用户信息'));
    }

    const params = {
        userId,
        addressTitle,
        recipientName,
        phoneNumber,
        province,
        city,
        district,
        streetAddress,
        zipCode,
        isDefault,
        ...rest
    };
    
        const res = await createUserAddress(params);

        if (!res) {
            context.throw('新增错误');
        }
    

    context.body = {
        message: '订单创建成功',
        data: true,
    };
    next();
}
async function deleteUserAddressController (context: any, next: any) {
    const { addressId, postData, ...rest } = context.request.body;
    if (!addressId) {
        context.throw(new Error('缺少商品orderId'));
    }
    
    const res = await deleteUserAddress(addressId);
    if (res) {
       
        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getUserAddressController,
    createUserAddressController,
    updateUserAddressController,
    deleteUserAddressController,
    getUserAddressByAddressIdController,
    getUserAddressByUserIdController,
}
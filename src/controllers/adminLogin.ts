
import { to } from '../../src/utils';
import {
    findUserByphone,
    updateUser,
   
} from '../models/admin';

async function adminLogin(context: any, next: any) {
    const { phoneNumber, password } = context.request.query;
    const res = await findUserByphone(phoneNumber)
   
    if (res) {
        if (res.password.toString() === password.toString()) {
            const a = await updateUser(res.userId, {
                lastLoginTime: new Date(),
            });
            context.body = {
                flag: true,
                message: '登录成功',
                ...res,
            };
        } else {
            context.body = {
                flag: false,
                message: '用户名或密码错误请重新输入'
            };
        }
       
    } else {
        context.body = {
            flag: false,
            message: '用户名或密码错误请重新输入'
        };
    }
    next();
}
export {
    adminLogin
}
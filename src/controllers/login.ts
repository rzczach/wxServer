
import { to } from '../../src/utils';
import {
    findUserByphone,
   
} from '../models/userModel';

async function login(context: any, next: any) {
    const { phoneNumber, password } = context.request.query;
    const res = await findUserByphone(phoneNumber)
    if (res) {
        if (res.password === password) {
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
    login
}
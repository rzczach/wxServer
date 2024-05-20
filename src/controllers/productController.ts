

/* eslint-disable @typescript-eslint/naming-convention */
import { to } from '../../src/utils';
import {
    findProduct,
    createProduct,
    updateProduct,
    findProductById,
    deleteProduct
} from '../models/productModel';

async function getProductController(context: any, next: any) {
    const res = await findProduct();
    // console.log('res',res);
    if (res) {
        context.body = {
            list: res,
        };
    }
    next();
}
async function getProductByIdController(context: any, next: any) {
    const { productId } = context.request.query;
   
    const [error, res] = await to<any>(findProductById, productId);
  
    if (res) {
        context.body = res;
    } else {
        context.throw(res);
    }
    next();
}
async function updateProductController(context: any, next: any) {
    const { productId, ...rest } = context.request.body;
    if (!productId) {
        context.throw('缺少Id');
    }
    const res = await updateProduct(productId, rest);
    console.log('res', res);
    if (res) {
        context.body = res;
    } else {
        context.throw(res);
    }
    next();
}
async function createProductController(context: any, next: any) {

    const { category, occasion, flowerMaterial, stemCount, price, originaPrice, detail, ...rest } = context.request.body;
    console.log('context.request.body', context.request.body);

    if (!category) {
        context.throw(new Error('未填写材质'));
    }

    const params = {
        category,
        occasion,
        flowerMaterial,
        stemCount,
        price,
        originaPrice,
        detail,
        ...rest
    };
    if (rest.productId) {
        const productInfo = await findProductById(rest.productId);
        if (productInfo) {
            const result = await updateProduct(rest.productId, params);
            context.body = {
                message: result ? '已有商品修改成功' : '已有商品修改失败',
                data: true,
            };
        }
    } else {

        const res = await createProduct(params);

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
async function deleteProductController (context: any, next: any) {
    const { productId, postData, ...rest } = context.request.body;
    if (!productId) {
        context.throw(new Error('缺少商品productId'));
    }
    
    const res = await deleteProduct(productId);
    if (res) {
       
        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getProductController,
    createProductController,
    updateProductController,
    deleteProductController,
    getProductByIdController
}
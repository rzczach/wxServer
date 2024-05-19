
import {
    createReview,
    getAllReviews,
    getReviewsByProductId,
    getReviewsByReviewId,
    updateReview,
    deleteReview
} from '../models/userReviews';



/* eslint-disable @typescript-eslint/naming-convention */
import { to } from '../../src/utils';


async function getReviewsController(context: any, next: any) {
    const res = await getAllReviews();
    if (res) {
        context.body = {
            list: res,
        };
    }

    next();
}
async function getReviewsProductIdController(context: any, next: any) {
    const { productId } = context.request.query;
    console.log('productId', productId);
    const [error, res] = await to<any>(getReviewsByProductId, productId);
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
async function getReviewsByReviewIdController(context: any, next: any) {
    const { reviewId } = context.request.query;
    console.log('messageId', reviewId);
    const [error, res] = await to<any>(getReviewsByReviewId, reviewId);

    if (res) {
        context.body = res;
    } else {
        context.throw(res);
    }
    next();
}
async function updateReviewsController(context: any, next: any) {
    const { reviewId, ...rest } = context.request.body;
    if (!reviewId) {
        context.throw('缺少reviewId');
    }
    const res = await updateReview(reviewId, rest);
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
async function createUserReviewsController(context: any, next: any) {

    const { productId, userId, rating, comment } = context.request.body;

    if (!productId) {
        context.throw(new Error('未填写商品id'));
    }

    const res = await createReview(productId, userId, rating, comment);
    if (!res) {
        context.throw('新增错误');
    }
    context.body = {
        message: '新增成功',
        data: true,
    };

    next();
}
async function deleteReviewsController(context: any, next: any) {
    const { reviewId } = context.request.body;
    if (!reviewId) {
        context.throw(new Error('缺少reviewId'));
    }

    const res = await deleteReview(reviewId);
    if (res) {
        context.body = {
            message: res.message,
            flag: res.flag,
        };
        next();
    }
}
export {
    getReviewsController,
    getReviewsProductIdController,
    getReviewsByReviewIdController,
    updateReviewsController,
    createUserReviewsController,
    deleteReviewsController,
}

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
import { findUserById } from '../models/userModel';


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
    const res = await getReviewsByProductId(productId);
    if (res) {
        const dataPromise = res.map(async (v) => {
            const userInfo = await findUserById(v.userId)
            return {
                ...v,
                ...userInfo
            }
        });
        const data = await Promise.all(dataPromise);
        context.body = {
            info: data,
        };
    } else {
        context.body = {
            info: [],
        };
    }
    next();
}
async function getReviewsByReviewIdController(context: any, next: any) {
    const { reviewId } = context.request.query;
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
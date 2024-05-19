import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { Product } from './productModel';
import { Users } from './userModel';

interface UserReviewsData {
    reviewId: number;
    productId: number;
    userId: number;
    rating: number;
    comment: string;
    reviewTime: number;

}

const UserReviews = sequelize.define('UserReviews', {
    reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'productId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'userId', // 假设User模型的主键是userId
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5, // 假设评分范围是1到5
        },
    },
    comment: {
        type: DataTypes.TEXT,
    },
    reviewTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // 设置默认值为当前时间
    },
}, {
    tableName: 'userReviews',
    timestamps: true,
    createdAt: 'reviewTime'
});
async function getAllReviews() {
    try {
        const reviews = await UserReviews.findAll();
        const list = reviews.map((d) => {
            return d.toJSON();
        })
        return list;
    } catch (error) {
        console.error('Failed to fetch all user reviews:', error);
    }
}
async function createReview(productId: number, userId: number, rating: number, comment: string) {
    try {
        const newReview = await UserReviews.create({
            productId: productId,
            userId: userId,
            rating: rating,
            comment: comment,
        });

        return newReview.toJSON();

    } catch (error) {
        console.error('Failed to create review:', error);
    }
}

async function getReviewsByProductId(productId: number) {
    try {
        const reviews = await UserReviews.findAll({
            where: { ProductID: productId },
        });
        return reviews.length ? reviews.map(reviews => reviews.toJSON()) : null;

    } catch (error) {
        console.error(`Failed to fetch reviews for ProductID ${productId}:`, error);
    }
}

async function getReviewsByReviewId(reviewId: number) {
    const id = Number(reviewId)
    try {
        // const id = Number(productId);
        // const userInstance = await Product.findOne({
        //     where: { productId: id },
        // });
        // return userInstance ? userInstance.toJSON() : null;
        const reviews = await UserReviews.findOne({
            where: { reviewId: id },
        });
        return reviews ? reviews.toJSON() : null;
        // return reviews.length ? reviews.map(reviews => reviews.toJSON()) : null;

    } catch (error) {
        console.error(`Failed to fetch reviews for ProductID ${reviewId}:`, error);
    }
}

async function updateReview(reviewId: number, updateData: Partial<UserReviewsData>) {
    try {
        console.log('reviewId', reviewId);
        console.log('updateData', updateData);
        const [affectedCount] = await UserReviews.update(updateData, {
            where: { ReviewID: reviewId },
        });
        console.log('affectedCount', affectedCount);
        return affectedCount > 0;

    } catch (error) {
        console.error(`Failed to update review with ID ${reviewId}:`, error);
    }
}

async function deleteReview(reviewId: number) {
    const info = await getReviewsByReviewId(reviewId);
    if (info) {
        const res = UserReviews.destroy({
            where: { ReviewID: reviewId },
        });
        console.log(res);
        return {
            flag: true,
            message: '删除成功'
        };
    }
    return {
        flag: false,
        message: '未找到'
    }
}

export {
    UserReviews,
    getAllReviews,
    createReview,
    getReviewsByProductId,
    getReviewsByReviewId,
    updateReview,
    deleteReview
}
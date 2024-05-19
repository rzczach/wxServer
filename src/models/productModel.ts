
import { DataTypes } from 'sequelize';
import sequelize from '../database/index'; // 引入数据库连接实例
import { ProductInfo } from 'src/types/product/index';

const Product = sequelize.define('Product', {
    productId: {
        type: DataTypes.INTEGER, // 将NUMBER替换为INTEGER
        autoIncrement: true, // 添加自增属性，假设productId是自增主键
        primaryKey: true,
    },
    name: DataTypes.STRING,
    mainImg: DataTypes.STRING,
    imgList: DataTypes.JSON,
    category: DataTypes.INTEGER,
    occasion: DataTypes.INTEGER,
    flowerMaterial: DataTypes.INTEGER,
    stemCount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    originaPrice: DataTypes.INTEGER,
    salesVolume: DataTypes.INTEGER,
    createTime: DataTypes.DATE,
    uploadTime: DataTypes.DATE,
    detail: DataTypes.STRING,
    deliveryInfo: DataTypes.STRING,
}, {
    tableName: 'product',
    timestamps: true, // 保持timestamps为true以启用createdAt和updatedAt
    createdAt: 'createTime', // 将createdAt映射到createTime字段
    updatedAt: 'updateTime', // 更正updatedAt映射到一个不同的字段，避免与uploadTime混淆
});

// 查找所有商品
async function findProduct(): Promise<ProductInfo[]> {
    const result = await Product.findAll();
    if (!result) {
        return Promise.reject('err');
    }

    const list = result.map((d) => {
        return d.toJSON();
    })
    return list;
}


// 查找某个商品
async function findProductById(productId: number): Promise<ProductInfo | null> {
    const id = Number(productId);
    const userInstance = await Product.findOne({
        where: { productId: id },
    });
    return userInstance ? userInstance.toJSON() : null;
}

// 修改某个用户
async function updateProduct(productId: number, productData: Partial<ProductInfo>) {
    try {
        const id = Number(productId);

        const [affectedCount] = await Product.update(productData, {
            where: { productId: id },
        }).catch(error => {
            console.error('Error updating product:', error);
            throw error; // 重新抛出异常，以便上层可以捕获
        });
        return affectedCount > 0;
    } catch (err) {
        return err;
    }
}
// 新增
async function createProduct(newProduct: Omit<ProductInfo, 'productId'>): Promise<ProductInfo | undefined> {
    try {
        const proInfo = await Product.create(newProduct);
        return proInfo.toJSON();
    } catch (e) {
        console.log(e);
    }
}
// 删除用户
async function deleteProduct(productId: number): Promise<any> {
    const info = await findProductById(productId);
    console.log('info',  info);
    if (info) {
        try {
            const res = Product.destroy({
                where: { productId },
            });
            console.log(res);
            return {
                flag: true,
                message: '删除成功'
            };
        } catch(e) {
            console.log(e);
        }
    }
    return {
        flag: false,
        message: '未找到用户'
    }
}
export {
    findProduct,
    findProductById,
    updateProduct,
    createProduct,
    deleteProduct,
    Product,
}
export interface ShoppingCardData {
    cartId: number; // 主键，自动递增的购物车项ID
    userId: number; // 外键，关联到用户表的用户ID
    productId: number; // 外键，关联到商品表的商品ID
    quantity: number; // 商品数量，默认为1
    addedTime: Date; // 商品加入购物车的时间，默认为当前时间戳
  }
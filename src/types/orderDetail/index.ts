export interface OrderDetailData {
    orderDetailId: number; // 订单详情ID，主键，自增
    orderId: number; // 订单ID，外键关联订单表
    productId: number; // 商品ID，外键关联商品表
    quantity: number; // 商品数量
    unitPrice: number; // 商品单价，两位小数
}
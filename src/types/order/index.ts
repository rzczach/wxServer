// 定义订单状态枚举
export enum OrderStatus {
    Unpaid = 'Unpaid',
    Paid = 'Paid',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

// 定义配送状态枚举
export enum DeliveryStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}

// 订单模型的 TypeScript 类型定义
export interface OrderData {
    orderId: number; // 主键，订单ID，自增
    productId: number; // 商品ID
    userId: number; // 用户ID，关联用户表
    orderNo: string; // 订单编号，通常由系统生成，唯一
    orderDate: number; // 下单时间，默认为当前时间
    totalPrice: number; // 订单总价，两位小数精度
    paymentMethod?: string; // 支付方式，可选
    deliveryAddress: string; // 配送地址，必填
    deliveryStatus: DeliveryStatus; // 配送状态，默认为Pending
    orderStatus: OrderStatus; // 订单状态，默认为Unpaid
    shippingAddressId?: number; // 默认配送地址ID，关联用户地址表，可选
}

// 示例使用
// const exampleOrder: OrderAttributes = {
//   orderId: 1, // 实际上这个字段通常不需要手动赋值，由数据库自动生成
//   userId: 2,
//   orderNo: 'ORD20230425001',
//   orderDate: new Date(),
//   totalPrice: 123.45,
//   paymentMethod: 'PayPal',
//   deliveryAddress: '123 Example Street, City, State, 12345',
//   deliveryStatus: DeliveryStatus.Processing,
//   orderStatus: OrderStatus.Paid,
//   shippingAddressId: 3,
// };
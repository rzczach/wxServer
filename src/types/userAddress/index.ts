export interface UserAddressData {
    addressId: number; // 主键，自动递增的地址ID
    userId: number; // 用户ID，关联到用户表的外键
    addressTitle: string; // 地址标题，例如“家庭住址”或“公司地址”
    recipientName: string; // 收件人的全名
    phoneNumber: string; // 联系电话号码
    province: string; // 省份名称
    city: string; // 城市名称
    district?: string; // 区县名称，可选
    streetAddress: string; // 详细的街道地址
    zipCode?: string; // 邮政编码，可选
    isDefault: boolean; // 是否设为默认地址，默认为false
    creationTime: Date; // 地址创建时间
    lastUpdateTime: Date; // 地址最后更新时间，自动更新
}

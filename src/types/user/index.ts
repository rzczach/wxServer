//  ---------------------------- 商品信息------------------------
export enum  CATEGORY {
    huashu = 1,
    lihe,
    dangao,
    hualan,
    lvzhi,
    shoutihualan,
    zhuohua
}
export enum  OCCASION {
    aiqing = 1,
    shengri,
    youqing,
    tanbing,
    daoqian,
    wenhou,
    ganxie,
    aisi,
    shangwu,
}
export enum FLOWERMATERIAL {
    meigui = 1,
    baihe,
    kangnaixin,
    xiangrikui,
    mantianxing,
    yujinxiang,
    juhua,
    other,
}
export interface ProductInfo {
    /**
     * 商品id
     */
    productId: number;
    /**
     * 类别
     */
    category: CATEGORY;
    /**
     *  场景
     */
    occasion: OCCASION;
    /**
     * 材质 花材
     */
    flowerMaterial: FLOWERMATERIAL;
    /**
     * 数量
     */
    stemCount: number;
    /**
     * 价格
     */
    price: number;
     /**
     * 划线价格
     */
    originaPrice: number;
     /**
     * 售卖数量
     */
    salesVolume: number;
     /**
     * 上新时间
     */
     createTime: number;
     /**
     * 更新时间
     */
     uploadTime: number;
     /**
      * 详情
      */
     detail: string;
     /**
      * 配送信息
      */
     deliveryInfo: string
}
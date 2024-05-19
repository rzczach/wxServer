function to<T>(asyncFun: (args?: any) => Promise<T> | T, ...args: any[]): Promise<[Error, undefined] | [undefined, T]> {
    return new Promise<any>((resolve) => {
        resolve(asyncFun(...args));
    })
        .then((result: T) => {
            return [undefined, result];
        })
        .catch((err: Error) => {
            return [err, undefined];
        }) as Promise<[Error, undefined] | [undefined, T]>;
}

function generateOrderNo(): string {
    // 获取当前时间戳，转换为字符串并取后10位（可根据需要调整长度）
    const timestampPart = new Date().getTime().toString().slice(-10);
  
    // 生成4位的随机数字，确保订单号总长度为16位
    const randomPart = Math.floor(Math.random() * 90000).toString().padStart(4, '0');
  
    // 拼接前缀、时间戳部分和随机数部分
    const orderNo = `wy${timestampPart}${randomPart}`;
  
    return orderNo;
  }
  
export {
    to,
    generateOrderNo
};

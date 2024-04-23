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

export {
    to
};

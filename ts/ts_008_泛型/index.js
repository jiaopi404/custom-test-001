// ======================== [泛型] ===========================
// function 写法
// const getLastIndex = function<T> (arr: Array<T>): T {
//     return arr[arr.length - 1]
// }
// 箭头函数写法
// const getLastIndex = <T>(arr: Array<T>): T => {
//     return arr[arr.length - 1]
// }
// 同上
// const getLastIndex = <T>(arr: T[]): T => {
//     return arr[arr.length - 1]
// }
//
// // 泛型类型？接口？
// declare type AxiosResponse<T> = {
//     code: number
//     msg?: string
//     data?: T
// }
// // type 关键字
// export declare type AxiosResponseNumber = AxiosResponse<number>
// let x = { a: undefined, b: null, c: 3, d: 4 };
//
// console.log(x?.a ?? x?.b) // 也实现了可选链
// ======================== [返回元祖] ===========================
var makeTuple = function (t, k) { return [t, k]; };
var tuple1 = makeTuple('22', 1);
console.log('%c [tuple1] ', 'color: #67C23A; font-size: 16px;', tuple1);

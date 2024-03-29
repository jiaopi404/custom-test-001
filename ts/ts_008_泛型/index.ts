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
// 泛型类型？接口？
declare type AxiosResponse<T> = {
    code: number
    msg?: string
    data?: T
}
// // type 关键字
// export declare type AxiosResponseNumber = AxiosResponse<number>

// let x = { a: undefined, b: null, c: 3, d: 4 };
//
// console.log(x?.a ?? x?.b) // 也实现了可选链

// ======================== [返回元祖] ===========================
const makeTuple = <T, K>(t: T, k: K): [T, K] => [t, k] // 返回元祖

declare type makeTuple2 = { <T, K>(t: T, k: K): [T, K] } // 某个泛型的 类型

const makeTuple3: makeTuple2 = makeTuple // 等同？

// type 包含？各种数据类型，以及 class, interface
const tuple1 = makeTuple<string, number>('22', 1)

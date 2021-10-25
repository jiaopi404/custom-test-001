// 数组
let arr = [1, '2'] // let arr: (string | number)[]

let arr2: any[] = [1, '2'] // let arr2: any[]

// 元祖
let tuple1: [number, string] = [1, '2'] // let tuple1: [number, string]

tuple1.push(2) // 不会报错

console.log(tuple1)

// union 联合类型
let union1: number | string = 23

let union2: number | string[] | [number, string] = tuple1

function merge (num1: number | string, num2: number | string): number | string {
    if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + num2
    } else {
        return +num1 + +num2
    }
}

let merge1 = merge('20', '10');
console.log('%c [merge1] ', 'color: #67C23A; font-size: 16px;', merge1) // 2010

// ======================== [literal] ===========================
let literal1: 1 | '2' | true | [1, 2] = '2' // 类似枚举类型
let literal2: 'save-local' | 'save-server' // 区分不同业务

// ======================== [any unknown] ===========================
let any1: any = 1
any1 = ''
any1 = {}
any1()
any1.toUpperCase()

// let unknown1: unknown = 1
// unknown1 = {}
// unknown1()
// unknown1.toUpperCase()
//
// if (typeof unknown1 === 'function') {
//     unknown1()
// }
// if (typeof unknown1 === 'string') {
//     unknown1.toUpperCase()
// }

// ======================== [never] ===========================
// function throwError (): never {
//     throw {
//         message: 'sk',
//         code: 200
//     }
// }
//
// throwError()

// // ======================== [type assertion 类型适配，类型断言] ===========================
// let message: any;
// message = '123abc'
//
// message.endsWith('c') // 不会报类型错误
//
// // TS2550: Property 'endsWith' does not exist on type 'string'.
// // Do you need to change your target library?
// // Try changing the `lib` compiler option to 'es2015' or later.
// let b1 = (<string> message).endsWith()
//
// let b2 = (message as string).trim()

// ======================== [可选参数 默认参数] ===========================
let func1 = function (msg) {
    console.log('%c [msg] ', 'color: #67C23A; font-size: 16px;', msg)
}
let func2 = (msg: string, code: number) => {
    console.log('%c [func2] ', 'color: #67C23A; font-size: 16px;', msg, code)
}
let func3 = (msg: string, code?: number) => { // 可选
    console.log('%c [func3] ', 'color: #67C23A; font-size: 16px;', msg, code)
}
let func4 = (msg: string, code: number = 200) => { // 默认
    console.log('%c [func4] ', 'color: #67C23A; font-size: 16px;', msg, code)
}

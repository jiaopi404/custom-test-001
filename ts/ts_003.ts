// ======================== [复杂数据类型] ===========================
let obj1 = { // let obj1: {foo: string, bar: string}
    foo: 'sdkf',
    bar: 'sfkjsdak'
}

console.log(obj1.foo) // TS2339: Property 'zoo' does not exist on type '{ foo: string; bar: string; }'.
// obj1.foo = 2 // TS2322: Type 'number' is not assignable to type 'string'.

let obj2: { foo: number, bar: string } = { // 手动给定类型，与上无异
    foo: 1,
    bar: 'skdjf'
}

let obj3: object = { // 指定类型为 object，笼统定义时，无法获取属性，参考如下报错信息;
    foo: 1,
    bar: 'sdd'
}
// obj3.foo // TS2339: Property 'foo' does not exist on type 'object'.
let obj4: {} = { foo:1,bar:2 } // 相当于 obj3 的定义
// obj4.foo // TS2339: Property 'foo' does not exist on type '{}'.

let obj5: any = {
    foo: 1,
    bar: 'sfdsf'
}
obj5.zoo // 此时不会报错了

// ======================== [interface] ===========================

// 基础使用
interface Point1 {
    x: number
    y: number
}

let drawPoint1 = (point: Point1) => {
    console.log({ x: point.x, y: point.y })
}

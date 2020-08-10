const hello: string = 'hello world'

// 类型断言
const someValue: any = [1, 2, 3]
const strLength: number = (<string>someValue).length

console.log('类型断言: strLength is: ', strLength)

// 接口

interface LabelledValue {
  label: string
}

function printLabel (labelObj: LabelledValue) {
  console.log('接口: labelObj.label is: ', labelObj.label)
}

const myObj: LabelledValue = {
  label: '您在干啥呢么呢'
}
printLabel(myObj)
// printLabel({ no: 1, label: '233' }) // 报错, 类型 LabelledValue 没有 no 属性


// 接口 2: 可选属性

interface Rect {
  height: number,
  width: number,
  name?: string
}

function replace (shape: Rect): Rect {
  return {
    height: shape.height + 1,
    width: shape.width + 1,
    name: '我是放大后的图形'
  }
}

const myRect1: Rect = { height: 100, width: 100, name: '我是长方形' }
const myRect2: Rect = replace(myRect1)

console.log(myRect1, myRect2)

// 接口 3: 索引签名
interface Circle {
  radius: number,
  posX: number,
  posY: number,
  [propName: string]: any
}

// 接口 函数类型: 定义 调用签名
interface GetPosFunc {
  (source: string): object
}

// 索引签名
// TypeScript支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
// 如下

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// interface NotOkay {
//   [x: number]: Animal;
//   [x: string]: Dog;
// }

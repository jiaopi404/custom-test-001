// 本例主要测试接口的使用

interface Pos {
  x: number,
  y: number,
  toString: () => string
}

interface RectShape {
  height: number,
  width: number,
  pos: Pos
}

class Position implements Pos {
  x: number
  y: number
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }
  toString () {
    return `{ x: ${this.x}, y: ${this.y} }`
  }
}

class Rect implements RectShape {
  height: number
  width: number
  pos: Pos

  constructor (h: number, w: number, pos: Pos) {
    this.height = h
    this.width = w
    this.pos = pos
  }

  toString ():string {
    return `{ height: ${this.height}, width: ${this.width}, pos: ${this.pos.toString()} }`
  }
}

// 1. 基础
const p1 = new Position(100, 200)
const rect1 = new Rect(50, 50, p1)
console.log(rect1.toString())

// 2. 传递一个接口
const pos1: Pos = {
  x: 1,
  y: 1,
  toString: function (this: Pos) {
    return `x is: ${this.x}, y is: ${this.y}`
  }
}
const rect2 = new Rect(10, 10, pos1)
console.log(rect2.toString())

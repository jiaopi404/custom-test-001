"use strict";
// 本例主要测试接口的使用
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.toString = function () {
        return "{ x: " + this.x + ", y: " + this.y + " }";
    };
    return Position;
}());
var Rect = /** @class */ (function () {
    function Rect(h, w, pos) {
        this.height = h;
        this.width = w;
        this.pos = pos;
    }
    Rect.prototype.toString = function () {
        return "{ height: " + this.height + ", width: " + this.width + ", pos: " + this.pos.toString() + " }";
    };
    return Rect;
}());
// 1. 基础
var p1 = new Position(100, 200);
var rect1 = new Rect(50, 50, p1);
console.log(rect1.toString());
// 2. 传递一个接口
var pos1 = {
    x: 1,
    y: 1,
    toString: function () {
        return "x is: " + this.x + ", y is: " + this.y;
    }
};
var rect2 = new Rect(10, 10, pos1);
console.log(rect2.toString());

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var pointFoo = new point_1.Point(3, 4);
var pointBar = new point_1.Point();
// 使用时，使用类; 多态？？？
console.log(point_1.Point.getDistance(pointFoo, pointBar));
console.log(pointFoo.getDistance(pointBar));

import { Point } from './point';

const pointFoo = new Point(3, 4)
const pointBar = new Point()

// 使用时，使用类; 多态？？？
console.log(Point.getDistance(pointFoo, pointBar))
console.log(pointFoo.getDistance(pointBar))

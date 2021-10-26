var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    /**
     * 打印点
     * @param point
     */
    Point.prototype.printPoint = function (point) {
        console.log('point is: ', { x: this.x, y: this.y });
    };
    /**
     * 获取距离
     * @param point2 默认为 (0, 0) 点
     */
    Point.prototype.getDistance = function (point2) {
        var tmpPoint = {
            x: 0,
            y: 0
        };
        if (point2) {
            tmpPoint = point2;
        }
        return +Math.sqrt(Math.pow((this.x - tmpPoint.x), 2) + Math.pow((this.y - tmpPoint.y), 2)).toFixed(2);
    };
    Point.getDistance = function (point1, point2) {
        var tmpPoint = {
            x: 0,
            y: 0
        };
        if (point2) {
            tmpPoint = point2;
        }
        return +Math.sqrt(Math.pow((point1.x - tmpPoint.x), 2) + Math.pow((point1.y - tmpPoint.y), 2)).toFixed(2);
    };
    return Point;
}());
var pointFoo = new Point(3, 4);
var pointBar = new Point();
console.log(Point.getDistance(pointFoo, pointBar));
console.log(pointFoo.getDistance(pointBar));

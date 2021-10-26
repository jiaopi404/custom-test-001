var Point = /** @class */ (function () {
    function Point(_x, _y) {
        var _this = this;
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        this._x = _x;
        this._y = _y;
        // getY () {
        //     return this._y
        // }
        this.getY = function () {
            return _this._y;
        };
        this.setY = function (y) {
            _this._y = y;
        };
    }
    Object.defineProperty(Point.prototype, "X", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 打印点
     * @param point
     */
    Point.prototype.printPoint = function (point) {
        console.log('point is: ', { x: this.X, y: this.getY() });
    };
    /**
     * 获取距离
     * @param point2 默认为 (0, 0) 点
     */
    Point.prototype.getDistance = function (point2) {
        var tmpPoint = new Point();
        tmpPoint.X = 0;
        tmpPoint.setY(0);
        if (point2) {
            tmpPoint = point2;
        }
        return +Math.sqrt(Math.pow((this.X - tmpPoint.X), 2) + Math.pow((this.getY() - tmpPoint.getY()), 2)).toFixed(2);
    };
    Point.getDistance = function (point1, point2) {
        var tmpPoint = new Point();
        tmpPoint.X = 0;
        tmpPoint.setY(0);
        if (point2) {
            tmpPoint = point2;
        }
        return +Math.sqrt(Math.pow((point1.X - tmpPoint.X), 2) + Math.pow((point1.getY() - tmpPoint.getY()), 2)).toFixed(2);
    };
    return Point;
}());
var pointFoo = new Point(3, 4);
var pointBar = new Point();
console.log(Point.getDistance(pointFoo, pointBar));
console.log(pointFoo.getDistance(pointBar));

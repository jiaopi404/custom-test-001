"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    // 私有的 _x 和 _y
    function Point(_x, _y) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
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
exports.Point = Point;

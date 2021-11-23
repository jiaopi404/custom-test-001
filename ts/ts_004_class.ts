interface IPoint {
    x: number;
    y: number;
    printPoint?: (point: IPoint) => void;
    getDistance?: (point1: IPoint, point2?: IPoint) => number;
    // 等同于上，箭头函数与普通函数的写法
    // getDistance (point1: IPoint, point2?: IPoint): number;
}

class Point implements IPoint {
    // 同时给定默认值??
    constructor (public x:number = 0, public y: number = 0) {
    }

    /**
     * 打印点
     * @param point
     */
    printPoint(point: IPoint): void {
        console.log('point is: ', { x: this.x, y: this.y})
    }

    /**
     * 获取距离
     * @param point2 默认为 (0, 0) 点
     */
    getDistance(point2: IPoint | undefined): number {
        let tmpPoint: IPoint = {
            x: 0,
            y: 0,
        }
        if (point2) {
            tmpPoint = point2
        }
        return +Math.sqrt((this.x - tmpPoint.x) ** 2 + (this.y - tmpPoint.y) ** 2).toFixed(2)
    }

    static getDistance(point1: IPoint, point2: IPoint | undefined): number {
        let tmpPoint: IPoint = {
            x: 0,
            y: 0,
        }
        if (point2) {
            tmpPoint = point2
        }
        return +Math.sqrt((point1.x - tmpPoint.x) ** 2 + (point1.y - tmpPoint.y) ** 2).toFixed(2)
    }
}

const pointFoo = new Point(3, 4)
const pointBar = new Point()

console.log(Point.getDistance(pointFoo, pointBar))
console.log(pointFoo.getDistance(pointBar))

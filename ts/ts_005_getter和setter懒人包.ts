interface IPoint {
    printPoint?: (point: IPoint) => void;
    getDistance?: (point1: IPoint, point2?: IPoint) => number;
    X: number; // getter setter 懒人包
    getY: () => number;
    setY: (y: number) => void;
}


class Point implements IPoint {
    constructor (private _x:number = 0, private _y: number = 0) {
    }
    set X(x: number) {
        this._x = x
    }
    get X(): number {
        return this._x
    }
    getY = () => {
        return this._y
    }
    setY = (y: number) => {
        this._y = y
    }

    /**
     * 打印点
     * @param point
     */
    printPoint(point: IPoint): void {
        console.log('point is: ', { x: this.X, y: this.getY()})
    }

    /**
     * 获取距离
     * @param point2 默认为 (0, 0) 点
     */
    getDistance(point2: IPoint | undefined): number {
        let tmpPoint = new Point() as IPoint // 这样必不会出错
        tmpPoint.X = 0
        tmpPoint.setY(0)
        if (point2) {
            tmpPoint = point2
        }
        return +Math.sqrt((this.X - tmpPoint.X) ** 2 + (this.getY() - tmpPoint.getY()) ** 2).toFixed(2)
    }

    static getDistance(point1: IPoint, point2: IPoint | undefined): number {
        let tmpPoint = new Point() as IPoint // 这样必不会出错
        tmpPoint.X = 0
        tmpPoint.setY(0)
        if (point2) {
            tmpPoint = point2
        }
        return +Math.sqrt((point1.X - tmpPoint.X) ** 2 + (point1.getY() - tmpPoint.getY()) ** 2).toFixed(2)
    }
}

const pointFoo = new Point(3, 4)
const pointBar = new Point()

// 使用时，使用类; 多态？？？
console.log(Point.getDistance(pointFoo, pointBar))
console.log(pointFoo.getDistance(pointBar))

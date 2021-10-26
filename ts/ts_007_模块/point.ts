interface IPoint { // 依然是模板
    printPoint?: (point: IPoint) => void;
    getDistance?: (point1: IPoint, point2?: IPoint) => number;
    x: number; // 公有的 getter 和 setter
    y: number;
}


export class Point implements IPoint {
    // 私有的 _x 和 _y
    constructor (private _x:number = 0, private _y: number = 0) {
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
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
            y: 0
        }
        if (point2) {
            tmpPoint = point2
        }
        return +Math.sqrt((this.x - tmpPoint.x) ** 2 + (this.y - tmpPoint.y) ** 2).toFixed(2)
    }

    static getDistance(point1: IPoint, point2: IPoint | undefined): number {
        let tmpPoint: IPoint = {
            x: 0,
            y: 0
        }
        if (point2) {
            tmpPoint = point2
        }
        return +Math.sqrt((point1.x - tmpPoint.x) ** 2 + (point1.y - tmpPoint.y) ** 2).toFixed(2)
    }
}

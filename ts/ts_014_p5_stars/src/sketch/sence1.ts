import { ThemeColor } from './../enums/StarColorEnum';
// import { ThemeColor } from './../enums/StarColorEnum';
import p5 from "p5";

export class Star {
  w: number; // width
  h: number; // height
  x: number; // coodi x
  y: number; // coodi y
  color: p5.Color;
  p: p5;

  constructor(p5: p5, w: number, h: number, x?: number, y?: number, color?: p5.Color) {
    this.p = p5;
    this.w = w;
    this.h = h;
    this.x = x ?? 0;
    this.y = y ?? 0;

    this.color = color ?? this.p.color(ThemeColor.BLUE);
  }

  moveTo (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveX () {
    const step = 1.5;
    this.x = this.x + step > this.p.windowWidth ? -50 : this.x + step;
  }

  show () {
    // this.p.fill(this.color);
    this.p.fill(this.color);
    this.p.rect(this.x, this.y, this.w, this.h);
  }
}
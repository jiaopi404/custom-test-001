import { StarColorEnum } from './../enums/StarColorEnum';
import p5 from "p5";

export class Star {
  x: number;
  y: number;
  color: StarColorEnum = StarColorEnum.BLUE; 
  p: p5;

  constructor(p: p5, x: number, y: number, color: StarColorEnum) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  show (cX: number = 50, cY: number = 50) {
    this.p.fill(255);
    this.p.rect(this.x, this.y, cX, cY);
  }

  

  destroy () {
  }

  print() {
    console.log('x: ', this.x, ' y: ', this.y);
  }
}
import p5 from "p5";
import { Star } from "./Star";
import { getRandomColorGetter } from "/@/utils/colorUtils";

export default (p: p5) => {
  const x = 100;
  const y = 100;

  const ww = p.windowWidth;
  const wh = p.windowHeight;

  const stars: Star[] = [];

  p.setup = () => {
    p.colorMode("rgb");
    p.createCanvas(p.windowWidth, p.windowHeight)

    // init
    const colorGetter = getRandomColorGetter();
    for (let i = 25; i < ww; i += 100) {
      for (let j = 25; j < wh; j += 100) {
        stars.push(new Star(p, 50, 50, i, j, colorGetter(p)));
      }
    }
  }

  p.draw = () => {
    p.background(0); // repaint

    stars.forEach(star => {
      star.moveX();
      star.show();
    })
  }
}
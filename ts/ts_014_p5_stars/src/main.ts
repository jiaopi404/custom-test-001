import p5 from "p5";

const sketch = (p: p5) => {
  const x = 100;
  const y = 100;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
  }

  p.draw = () => {
    p.background(0);
  }
}

new p5(sketch);

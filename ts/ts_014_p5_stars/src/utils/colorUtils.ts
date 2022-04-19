import { ThemeColor } from './../enums/StarColorEnum';
import p5 from 'p5';

export const getRandomColorGetter = () => {
  const keysOfThemeColor: string[] = Object.keys(ThemeColor);
  
  return (p: p5): p5.Color => {
    return p.color(ThemeColor[keysOfThemeColor[Math.floor(Math.random() * keysOfThemeColor.length)]]);
  }
}
// export const readFileSync = (path: string) => fs.readFileSync(path){}
import fs  from 'fs';
import path from 'path';

/**
 * 读json 文件
 * @param filePath 
 * @returns 
 */
export const readMyFileSync = (filePath?: string) => {
  if (!filePath) {
    filePath = path.resolve(path.join(__dirname, '../../static/json.txt'))
  }
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * 写入 json
 * @param content 
 */
export const write2JSON = (content: string, filePath?: string) => {
  if (!filePath) {
    filePath = path.resolve(path.join(__dirname, '../../static/json.json'))
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

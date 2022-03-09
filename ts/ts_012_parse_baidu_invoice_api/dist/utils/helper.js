"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write2JSON = exports.readMyFileSync = void 0;
// export const readFileSync = (path: string) => fs.readFileSync(path){}
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * 读json 文件
 * @param filePath
 * @returns
 */
var readMyFileSync = function (filePath) {
    if (!filePath) {
        filePath = path_1.default.resolve(path_1.default.join(__dirname, '../../static/json.txt'));
    }
    return fs_1.default.readFileSync(filePath, 'utf-8');
};
exports.readMyFileSync = readMyFileSync;
/**
 * 写入 json
 * @param content
 */
var write2JSON = function (content, filePath) {
    if (!filePath) {
        filePath = path_1.default.resolve(path_1.default.join(__dirname, '../../static/json.json'));
    }
    fs_1.default.writeFileSync(filePath, content, 'utf-8');
};
exports.write2JSON = write2JSON;
//# sourceMappingURL=helper.js.map
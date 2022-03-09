"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readContentAsJson = void 0;
/**
 * 内容处理为 JSON
 * @param content
 */
var readContentAsJson = function (content) {
    var jsonRes = [];
    var pattern = /(\++)\s+(\w+)\s+(\S)\s+([\w\[\]]+)\s+(\S+)/g;
    var result = pattern.exec(content);
    var index = 0;
    while (result) {
        // 1. 处理
        var _a = descParser(result[5]), desc = _a.desc, subDesc = _a.subDesc;
        var field = {
            fieldLevel: levelParser(result[1]),
            filedName: result[2],
            isNecessary: isNecessaryParser(result[3]),
            type: typeParser(result[4]),
            desc: desc,
            subDesc: subDesc,
            index: index,
            arrayIndex: index,
        };
        if (!isRowNWord(field.filedName)) {
            jsonRes.push(field);
        }
        // 2. 递增
        index++;
        result = pattern.exec(content);
    }
    return jsonRes;
};
exports.readContentAsJson = readContentAsJson;
/**
 * 要跳过
 * @param fieldName
 * @returns
 */
function isRowNWord(fieldName) {
    return fieldName === 'row' || fieldName === 'word';
}
function levelParser(level) {
    if (!/^\++$/.test(level)) {
        throw new Error("解析错误");
    }
    return level.length;
}
function typeParser(type) {
    var filedType;
    switch (type) {
        case "string":
            filedType = "string";
            break;
        case "array[]":
            filedType = "array";
            break;
        case "uint32":
            filedType = "string";
            break;
        default:
            filedType = "string";
            break;
    }
    return filedType;
}
function descParser(desc) {
    var seperatorPattern = /[,.，。]/;
    var tmp = desc.split(seperatorPattern);
    if (tmp.length === 1) {
        return { desc: tmp[0], subDesc: '' };
    }
    else {
        return { desc: tmp[0], subDesc: tmp.slice(1).join('') };
    }
}
function isNecessaryParser(isNecessary) {
    return isNecessary === '是';
}
//# sourceMappingURL=index.js.map
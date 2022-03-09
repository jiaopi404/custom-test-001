import { FieldTypeT, FieldI } from "./../model/Field";
/**
 * 内容处理为 JSON
 * @param content
 */
export const readContentAsJson = (content: string) => {
  const jsonRes: FieldI[] = [];

  const pattern = /(\++)\s+(\w+)\s+(\S)\s+([\w\[\]]+)\s+(\S+)/g;

  let result = pattern.exec(content);
  let index = 0;
  while (result) {
    // 1. 处理
    const { desc, subDesc } = descParser(result[5]);
    const field: FieldI = {
      fieldLevel: levelParser(result[1]),
      filedName: result[2],
      isNecessary: isNecessaryParser(result[3]),
      type: typeParser(result[4]),
      desc,
      subDesc,
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

/**
 * 要跳过
 * @param fieldName 
 * @returns 
 */
function isRowNWord (fieldName: string) {
  return fieldName === 'row' || fieldName === 'word'
}

function levelParser(level: string): number {
  if (!/^\++$/.test(level)) {
    throw new Error("解析错误");
  }
  return level.length;
}

function typeParser(type: string): FieldTypeT {
  let filedType: FieldTypeT;
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

function descParser (desc: string) {
  const seperatorPattern = /[,.，。]/

  const tmp = desc.split(seperatorPattern)

  if (tmp.length === 1) {
    return { desc: tmp[0], subDesc: '' }
  } else {
    return { desc: tmp[0], subDesc: tmp.slice(1).join('') }
  }
}

function isNecessaryParser (isNecessary: string): boolean {
  return isNecessary === '是'
}

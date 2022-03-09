/**
 * 支持的类型
 */
export type FieldTypeT = "number" | "array" | "string";
export interface FieldI {
  filedName: string; // 字段名
  isNecessary: boolean; // 是否必选
  type: FieldTypeT; // 类型
  desc: string; // 说明
  subDesc: string; // 说明后边的解释
  index: number; // 字段名的顺序
  arrayIndex: number; // arrayIndex 类型为 array 时，需要有这个索引
  fieldLevel: number; // 字段层级
}
// export class Field implements Field {
//   constructor() {}
// }

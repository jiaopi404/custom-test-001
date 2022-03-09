import { readContentAsJson } from "./core/index";
// import { Field } from "./model/Field";
import { readMyFileSync, write2JSON } from "./utils/helper";

const content = readMyFileSync();

const jsonRes = readContentAsJson(content);

console.log("jsonRes is: ", jsonRes);

write2JSON(JSON.stringify(jsonRes));

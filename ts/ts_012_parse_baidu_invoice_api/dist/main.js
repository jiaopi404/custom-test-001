"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./core/index");
// import { Field } from "./model/Field";
var helper_1 = require("./utils/helper");
var content = (0, helper_1.readMyFileSync)();
var jsonRes = (0, index_1.readContentAsJson)(content);
console.log("jsonRes is: ", jsonRes);
(0, helper_1.write2JSON)(JSON.stringify(jsonRes));
//# sourceMappingURL=main.js.map
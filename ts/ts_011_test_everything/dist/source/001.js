"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
function start() {
    // console.log("sfdjslkfjk");
    var MyEnum;
    (function (MyEnum) {
        MyEnum["ENUM_A"] = "A";
        MyEnum["ENUM_B"] = "B";
        MyEnum["ENUM_C"] = "C";
    })(MyEnum || (MyEnum = {}));
    console.log("A" in MyEnum);
    var someAttr = "A";
}
exports.start = start;

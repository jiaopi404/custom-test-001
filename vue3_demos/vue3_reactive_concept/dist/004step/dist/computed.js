"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = void 0;
var ref_1 = require("./ref");
var effect_1 = require("./effect");
var computed = function (getter) {
    var _ref = (0, ref_1.ref)(0);
    (0, effect_1.effect)(function () {
        _ref.value = getter();
    });
    return _ref;
};
exports.computed = computed;

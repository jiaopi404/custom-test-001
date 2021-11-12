"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseProxyHandler = void 0;
var effect_1 = require("./effect");
/**
 * base proxy handler
 */
exports.baseProxyHandler = {
    get: function (target, key, receiver) {
        var result = Reflect.get(target, key, receiver); // 反射拿值
        (0, effect_1.track)(target, key);
        return result;
    },
    set: function (target, key, value, receiver) {
        var oldValue = target[key];
        if (oldValue === value) {
            return false;
        }
        Reflect.set(target, key, value, receiver);
        (0, effect_1.trigger)(target, key);
        return true;
    }
};

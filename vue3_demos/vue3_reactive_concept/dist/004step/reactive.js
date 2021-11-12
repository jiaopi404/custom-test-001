"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactive = void 0;
var baseProxyHandler_1 = require("./baseProxyHandler");
/**
 * reactive 方法
 * @param target
 */
var reactive = function (target) {
    return new Proxy(target, baseProxyHandler_1.baseProxyHandler);
};
exports.reactive = reactive;

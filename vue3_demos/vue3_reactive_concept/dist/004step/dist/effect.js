"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trigger = exports.track = exports.effect = void 0;
var targetMap = new WeakMap(); // 存放 deps
var activeEffect = null;
/**
 * effect
 * @param eff
 */
var effect = function (eff) {
    activeEffect = eff;
    activeEffect();
    activeEffect = null;
};
exports.effect = effect;
/**
 * track 组建 targetMap
 * @param target
 * @param key key of target
 */
var track = function (target, key) {
    // console.log('tracker: ', target, key)
    var depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap); // !important
    }
    var deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps); // !important
    }
    if (activeEffect) { // !important
        deps.add(activeEffect);
    }
};
exports.track = track;
/**
 * 执行所有的 effect
 * @param target
 * @param key
 */
var trigger = function (target, key) {
    // console.log('trigger: ', target, key)
    var depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    var deps = depsMap.get(key);
    if (!deps) {
        return;
    }
    deps.forEach(function (eff) { return eff(); }); // 执行所有的 effect
};
exports.trigger = trigger;

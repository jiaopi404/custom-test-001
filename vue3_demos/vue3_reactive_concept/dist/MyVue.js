"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = exports.ref = exports.reactive = exports.effect = void 0;
var targetMap = new WeakMap();
var activeEffect = null;
var effect = function (eff) {
    activeEffect = eff;
    activeEffect(); // 会触发 Proxy 或 ref 的 getter
    activeEffect = null;
};
exports.effect = effect;
function track(target, key) {
    var depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    var dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    if (activeEffect) {
        dep.add(activeEffect);
    }
}
function trigger(target, key) {
    var depsMap = targetMap.get(target);
    if (depsMap) {
        var dep = depsMap.get(key);
        console.log('trigger', key, ', depLength: ', dep && dep.size);
        if (dep) {
            dep.forEach(function (effect) { return effect(); });
        }
    }
}
function reactive(target) {
    var _handler = {
        get: function (_target, key, receiver) {
            console.log('proxy getter', JSON.stringify(_target), key);
            var result = Reflect.get(_target, key, receiver);
            track(_target, key);
            return result;
        },
        set: function (_target, key, value, receiver) {
            console.log('proxy setter', JSON.stringify(_target), key, value);
            var oldValue = _target[key];
            if (oldValue === value) {
                return false;
            }
            Reflect.set(_target, key, value, receiver);
            trigger(_target, key);
            return true;
        }
    };
    return new Proxy(target, _handler);
}
exports.reactive = reactive;
var ref = function (target) {
    // 新建一个对象，返回，闭包闭起来
    var _value = target;
    var _obj = {
        get value() {
            track(_obj, 'value');
            console.log('in ref getter: ', _value);
            return _value;
        },
        set value(v) {
            console.log('in ref setter: ', v);
            // ref 的value的改变
            var oldValue = _value;
            if (oldValue !== v) {
                trigger(_obj, 'value');
                _value = v;
            }
        }
    };
    return _obj;
};
exports.ref = ref;
var computed = function (getter) {
    var result = (0, exports.ref)(0);
    (0, exports.effect)(function () {
        result.value = getter();
    });
    return result;
};
exports.computed = computed;

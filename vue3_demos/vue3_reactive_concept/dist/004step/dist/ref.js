"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ref = void 0;
var effect_1 = require("./effect");
/**
 * ref
 * @param v
 */
var ref = function (v) {
    var _value = v;
    return {
        get value() {
            (0, effect_1.track)(this, 'value');
            return _value;
        },
        set value(nv) {
            if (nv === _value) {
                return;
            }
            _value = nv;
            (0, effect_1.trigger)(this, 'value');
        }
    };
};
exports.ref = ref;

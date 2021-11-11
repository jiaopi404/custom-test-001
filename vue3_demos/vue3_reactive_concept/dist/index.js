"use strict";
var price = 5;
var quantity = 10;
var total = 0;
var dep = new Set(); // save the effect，依赖关系
// some effect
var effect = function () { total = price * quantity; };
function track() {
    dep.add(effect);
}
function trigger() {
    dep.forEach(function (effect) {
        effect();
    });
}
console.log('before trigger, total: ', total);
track();
trigger();
console.log('after trigger, total: ', total);

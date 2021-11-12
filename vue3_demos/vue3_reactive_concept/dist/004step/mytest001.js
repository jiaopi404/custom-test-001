"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("./dist/vue");
var usr = (0, vue_1.reactive)({
    firstName: 'jio',
    lastName: 'pi'
});
var fullName = '';
(0, vue_1.effect)(function () {
    fullName = usr.firstName + '-' + usr.lastName;
});
console.log('fullName is: ', fullName);
// change firstName
usr.firstName = '404';
console.log('fullName is: ', fullName);
// computed
var count = (0, vue_1.ref)(1);
var double = (0, vue_1.computed)(function () { return count.value * 2; });
console.log('double is: ', double.value);
count.value++;
console.log('after count change, double is: ', double.value);

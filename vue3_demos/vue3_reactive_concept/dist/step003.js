"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyVue_1 = require("./MyVue");
var product = (0, MyVue_1.reactive)({ price: 2, quantity: 5 });
// let total = 0
//
// effect(() => {
//   total = product.price + product.quantity
//   console.log('in effect, total is: ', total)
// })
var totalRef = (0, MyVue_1.computed)(function () {
    return product.price + product.quantity;
});
console.log('total value is: ', totalRef.value);
product.price = 3;
console.log('total value is: ', totalRef.value);

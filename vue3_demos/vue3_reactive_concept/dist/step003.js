"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyVue_1 = require("./MyVue");
var product = (0, MyVue_1.reactive)({ price: 2, quantity: 5 });
var total = 0;
(0, MyVue_1.effect)(function () {
    total = product.price + product.quantity;
    console.log('in effect, total is: ', total);
});
console.log('total value is: ', total);
product.price = 3;
console.log('total value is: ', total);

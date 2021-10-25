// 数组
var arr = [1, '2']; // let arr: (string | number)[]
var arr2 = [1, '2']; // let arr2: any[]
// 元祖
var tuple1 = [1, '2']; // let tuple1: [number, string]
tuple1.push(2); // 不会报错
console.log(tuple1);
// union 联合类型
var union1 = 23;
var union2 = tuple1;
function merge(num1, num2) {
    if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + num2;
    }
    else {
        return +num1 + +num2;
    }
}
var merge1 = merge('20', '10');
console.log('%c [merge1] ', 'color: #67C23A; font-size: 16px;', merge1);

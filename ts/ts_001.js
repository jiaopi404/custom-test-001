var hello = 'hello world';
// 类型断言
var someValue = [1, 2, 3];
var strLength = someValue.length;
console.log('类型断言: strLength is: ', strLength);
function printLabel(labelObj) {
    console.log('接口: labelObj.label is: ', labelObj.label);
}
var myObj = {
    label: '您在干啥呢么呢'
};
printLabel(myObj);
function replace(shape) {
    return {
        height: shape.height + 1,
        width: shape.width + 1,
        name: '我是放大后的图形'
    };
}
var myRect1 = { height: 100, width: 100, name: '我是长方形' };
var myRect2 = replace(myRect1);
console.log(myRect1, myRect2);

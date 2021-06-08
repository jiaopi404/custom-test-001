//arithmetic.js
"use strict";

let process = require("process");

let token = null;
let para = null;
let len = null;
let p = 0;

function expr() {
  let value = term();
  let res = expr_tail(value);
  return res;
}

function expr_tail(lvalue) {
  if('+' == token) {
    match('+');
    return expr_tail(lvalue + term());
  } else if('-' == token) {
    match('-');
    return expr_tail(lvalue - term());
  } else {
    return lvalue;
  }
}

function term() {
  return term_tail(factor());
}

function term_tail(value) {
  if('*' == token) {
    match('*');
    return term_tail(value * factor());
  } else if('/' == token){
    match('/');
    return term_tail(value / factor());
  } else {
    return value;
  }
}

function factor() {
  if('(' == token) {
    match('(');
    let lvalue = expr();
    match(')');
    return lvalue;
  } else if("number" == typeof token) {
    let lvalue = token;
    match(token);
    return lvalue;
  } else {
    console.log("\n\texpect token is number or '(', but get the token is ", token, '\n');
    process.exit();
  }
}


function next() {
  if(p >= len) {
    token = null;
    return ;
  }
  let cur_token = para[p++];
  if(cur_token >= '0' && cur_token <= '9') {
    let num = 0;
    while(cur_token >= '0' && cur_token <= '9') {
      num = num * 10 + parseInt(cur_token);
      cur_token = para[p];
      p++;
    }
    p--;
    token = num;
    return ;
  } else if(cur_token == '+') {
    token = '+';
    return ;
  } else if(cur_token == '-') {
    token = '-';
    return ;
  } else if(cur_token == '*') {
    token = '*';
    return ;
  } else if(cur_token == '/') {
    token = '/';
    return ;
  } else if(cur_token == '(') {
    token = '(';
    return ;
  } else if(cur_token == ')') {
    token = ')';
    return ;
  } else {
    console.log("\n\tunknow token !!! ", cur_token, '\n');
    process.exit();
  }
}

function match(tk) {
  if(tk != token) {
    console.log("\n\terror match the token !!!\n", tk, '\n');
    process.exit();
  }
  next();
}

//get the parameter
para = process.argv.splice(2)[0];
if("undefined" == typeof para) {
  console.log("\n\tplease input the express !!!!\n");
  process.exit();
}

len = para.length;
p = 0;
next();
console.log(expr());
package com.jiaopi404.demo001;

public class JavaTest011_258 {

//    public int addDigits(int num){
//        return (num-1)%9+1;
//    }
    public int addDigits(int num){
        int e = (int) Math.floor(Math.log10(num));
        if (e == 0) {
            return num;
        }
        int tmp = 0;
        for (int i = e; i >= 0; i--) {
            tmp += (int) Math.floor(num / Math.pow(10, e));
            num -= Math.pow(10, e);
        }
        return addDigits(tmp);
    }

    public static void main(String[] args) {
        JavaTest011_258 javaTest011_258 = new JavaTest011_258();

//        String n = "123";
        int num = 38;

        int result = javaTest011_258.addDigits(num);

        System.out.println("result is: " + result);
    }
}

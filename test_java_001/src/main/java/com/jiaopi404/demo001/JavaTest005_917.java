package com.jiaopi404.demo001;

public class JavaTest005_917 {

    public String reverseOnlyLetters(String s) {
        char[] chars = s.toCharArray();

        int l = 0;
        int r = s.length() - 1;

        while (l < r) {

            char charL = chars[l];
            char charR = chars[r];

            if (!Character.isLetter(charL)) {
                l++;
                continue;
            }
            if (!Character.isLetter(charR)) {
                r--;
                continue;
            }

            // 交换
            chars[r] = charL;
            chars[l] = charR;
            l++;
            r--;
        }

        return new String(chars);
    }

    public static void main(String[] args) {
        JavaTest005_917 javaTest005_917 = new JavaTest005_917();

//        String param = "a-bC-dEf-ghIj";
        String param = "Test1ng-Leet=code-Q!";
        String result = javaTest005_917.reverseOnlyLetters(param);

        System.out.println("param: " + param);
        System.out.println("result: " + result);
    }
}

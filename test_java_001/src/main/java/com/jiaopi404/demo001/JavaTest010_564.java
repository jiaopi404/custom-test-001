package com.jiaopi404.demo001;

import java.util.Arrays;

public class JavaTest010_564 {

    public String nearestPalindromic(String n) {
        if (n.equals("11") || n.equals("10")) {
            return "9";
        }
        int len = n.length();
        // 1. n.length == 1, 返回 - 1
        if (len == 1) {
            return String.valueOf((Integer.parseInt(n) - 1));
        }
        int num = Integer.parseInt(n);
        // 2. n.length > 1, 构造回文字符串
        String newN = this.getPalindromic(n);

        int newNum = Integer.parseInt(newN);
        if (newNum > num) {
            int newNewNum = num - 10;
            String newNewN = this.getPalindromic(String.valueOf(newNewNum));
            newNewNum = Integer.parseInt(newNewN);
            return Math.abs(newNum - num) >= Math.abs(newNewNum - num) ? newNewN : newN;
        }
        if (newNum == num && len % 2 == 0) {
            int newNewNum = num - 10;
            String newNewN = this.getPalindromic(String.valueOf(newNewNum));
            newNewNum = Integer.parseInt(newNewN);
            // 加10
            int num3 = num + 10;
            String s3 = this.getPalindromic(String.valueOf(num3));
            num3 = Integer.parseInt(s3);
            return Math.abs(num3 - num) >= Math.abs(newNewNum - num) ? newNewN : s3;
        }
        return newN;
    }

    public String getPalindromic(String n) {
        int len = n.length();
        StringBuilder sbL = new StringBuilder();
        StringBuilder sbR = new StringBuilder();
        for (int i = 0; i < (len - 0.00) / 2; i++) {
            sbL.append(n.charAt(i));
            if (sbL.length() + sbR.length() == len) {
                break;
            } else {
                sbR.append(n.charAt(i));
            }
        }
        return "" + sbL + sbR.reverse();
    }

    public static void main(String[] args) {
        JavaTest010_564 javaTest010_564 = new JavaTest010_564();

//        String n = "123";
        String n = "11911";

        String result = javaTest010_564.nearestPalindromic(n);

        System.out.println("result is: " + result);
    }
}

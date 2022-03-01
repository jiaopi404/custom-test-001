package com.jiaopi404.demo001;

import java.util.Arrays;

public class JavaTest008_6 {
    public String convert(String s, int numRows) {
        int len = s.length();

        if (numRows == 1 || numRows >= len) {
            return s;
        }
        StringBuilder sb = new StringBuilder();
        int p = 2 * numRows - 2; // 周期
        for (int i = 0; i < numRows; i++) {
            int index = 0;
            while (index < s.length() - i) {
                int one = index + i;
                int two = index + p - i;

                if (one == two || one == two - p){
                    sb.append(s.charAt(one));
                } else {
                    sb.append(s.charAt(one));
                    if (two < s.length()) {
                        sb.append(s.charAt(two));
                    }
                }
                index += p;

            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        JavaTest008_6 javaTest008_6 = new JavaTest008_6();
//        String s = "PAYPALISHIRING";
//        int numRows = 4;

        String s = "PAYPALISHIRING";
        int numRows = 3;



        String result = javaTest008_6.convert(s, numRows);
        System.out.println("param: " + s + ", " + numRows);
        System.out.println("result: " + result);
    }
}

package com.jiaopi404.demo001;

public class JavaTest002_838 {
    //    public String pushDominoes(String dominoes) {
//        // 计算除了两边倒的情形
////        int start = 0;
////
////        boolean range = false;
////
////        StringBuilder sb = new StringBuilder(dominoes);
////
////        for (int i = 0; i < dominoes.length(); i++) {
////            char cur = dominoes.charAt(i);
////            if (cur == 'R') {
////                start = i;
////                range = true;
////            }
////            if (cur == 'L' && range) {
////                range = false;
////                // 1. 进行处理
////                String subStr = dominoes.substring(start, i + 1);
////                char startChar = 'R';
////                char endChar = 'L';
////
////                System.out.println("sub str: " + subStr + ", start char end char: " + startChar + ", " + endChar + ", start i: "
////                        + start + ", " + i
////                );
////                // 中间, 看奇数 偶数
////                if (subStr.length() % 2 == 0) {
////                    // 偶数
////                    int center = subStr.length() / 2 - 1;
////                    for (int j = 0; j < center; j++) {
////                        sb.setCharAt(start + 1 + j, startChar);
////                        sb.setCharAt(i - 1 - j, endChar);
////                    }
////                } else {
////                    for (int j = 0; j < subStr.length() / 2 - 1; j++) {
////                        sb.setCharAt(start + 1 + j, startChar);
////                        sb.setCharAt(i - 1 - j, endChar);
////                    }
////                }
////            }
////        }
//
//        // 双指针
//
//        int start = 0;
//        int end = 0;
//
//        boolean change = false;
//
//        StringBuilder sb = new StringBuilder(dominoes);
//
//        for (int i = 0; i < dominoes.length(); i++) {
//            char cur = dominoes.charAt(i);
//            if (cur == 'R' || cur == 'L' || i == dominoes.length() - 1) {
//                end = i;
//
//                // 1. 处理各种情况
//                String subStr = dominoes.substring(start, i + 1);
//                char startChar = subStr.charAt(0);
//                char endChar = subStr.charAt(subStr.length() - 1);
//
//                System.out.println("sub str: " + subStr + ", start char end char: " + startChar + ", " + endChar + ", start i: "
//                        + start + ", " + i
//                );
//
//                // 1.1 start or all L
//                if ((startChar == '.' || startChar == 'L') && endChar == 'L') {
//                    for (int j = start; j < end; j++) {
//                        sb.setCharAt(j, 'L');
//                    }
//                    change = true;
//                }
//                if (startChar == 'R' && endChar == 'R') {
//                    for (int j = start; j < end; j++) {
//                        sb.setCharAt(j, 'R');
//                    }
//                    change = true;
//                }
//
//                if (startChar == 'R' && endChar == 'L') {
//                    // 中间, 看奇数 偶数
//                    if (subStr.length() % 2 == 0) {
//                        // 偶数
//                        int center = subStr.length() / 2 - 1;
//                        for (int j = 0; j < center; j++) {
//                            sb.setCharAt(start + 1 + j, startChar);
//                            sb.setCharAt(i - 1 - j, endChar);
//                        }
//                    } else {
//                        for (int j = 0; j < subStr.length() / 2 - 1; j++) {
//                            sb.setCharAt(start + 1 + j, startChar);
//                            sb.setCharAt(i - 1 - j, endChar);
//                        }
//                    }
//                    change = true;
//                }
//
//                if (i == dominoes.length() - 1 && endChar == '.') {
//                    if (startChar == 'R') {
//                        for (int j = start + 1; j <= end; j++) {
//                            sb.setCharAt(j, 'R');
//                        }
//                        change = true;
//                    }
//                }
//
//                if (startChar == 'L' && endChar == 'R') {
//                    change = true;
//                }
//
//                // 2. 修改start值
//                if (change) {
//                    start = i;
//                }
//            }
//        }
//
////        for (int i = 0; i < dominoes.length(); i++) {
////            char cur = dominoes.charAt(i);
////            if (cur == 'R' || cur == 'R') {
////                if (i - start == 1) { // 连续 L R
////                    start = i;
////                }
////                if (i - start > 1) {
////                    // 1. 进行处理
////                    String subStr = dominoes.substring(start, i + 1);
////                    char startChar = subStr.charAt(0);
////                    char endChar = subStr.charAt(subStr.length() - 1);
////
////                    System.out.println("sub str: " + subStr + ", start char end char: " + startChar + ", " + endChar + ", start i: "
////                        + start + ", " + i
////                    );
////
////                    if (startChar == '.') { // 开始
////                        for (int j = subStr.length() - 2; j >= 0; j--) {
////                            sb.setCharAt(i - j, endChar);
////                        }
////                    }
////                    // 中间, 看奇数 偶数
////                    if (subStr.length() % 2 == 0) {
////                        // 偶数
////                        int center = subStr.length() / 2;
////                        for (int j = 0; j < center; j++) {
////                            sb.setCharAt(start + 1 + j, startChar);
////                            sb.setCharAt(i - 1 - j, endChar);
////                        }
////                    }
////                    // 2. 修改 start
////                    start = i;
////                }
////            } else {
////                if (i == dominoes.length() - 1) {
////                    if (i - start >= 1) {
////                        // 1. 进行处理
////                        String subStr = dominoes.substring(start);
////                        char startChar = subStr.charAt(0);
////
////                        for (int j = start + 1; j < dominoes.length() - 1; j++) {
////                            sb.setCharAt(j, startChar);
////                        }
////                    }
////                }
////            }
////        }
//
//        return sb.toString();
//    }
//    public String pushDominoes(String dominoes) {
//        // 双指针
//        int start = 0;
//        int end = 0;
//        boolean change = false;
//        StringBuilder sb = new StringBuilder(dominoes);
//        for (int i = 0; i < dominoes.length(); i++) {
//            char cur = dominoes.charAt(i);
//            if (cur == 'R' || cur == 'L' || i == dominoes.length() - 1) {
//                end = i;
//                // 1. 处理各种情况
//                String subStr = dominoes.substring(start, i + 1);
//                char startChar = subStr.charAt(0);
//                char endChar = subStr.charAt(subStr.length() - 1);
//                System.out.println("sub str: " + subStr + ", start char end char: " + startChar + ", " + endChar + ", start i: "
//                        + start + ", " + i
//                );
//                // 1.1 start or all L
//                if ((startChar == '.' || startChar == 'L') && endChar == 'L') {
//                    for (int j = start; j < end; j++) {
//                        sb.setCharAt(j, 'L');
//                    }
//                    change = true;
//                }
//
//                if (startChar == '.' && endChar == 'R') {
//                    change = true;
//                }
//                if (startChar == 'R' && endChar == 'R') {
//                    for (int j = start; j < end; j++) {
//                        sb.setCharAt(j, 'R');
//                    }
//                    change = true;
//                }
//                if (startChar == 'R' && endChar == 'L') {
//                    // 中间, 看奇数 偶数
//                    if (subStr.length() % 2 == 0) {
//                        // 偶数
//                        int center = subStr.length() / 2 - 1;
//                        for (int j = 0; j < center; j++) {
//                            sb.setCharAt(start + 1 + j, startChar);
//                            sb.setCharAt(i - 1 - j, endChar);
//                        }
//                    } else {
//                        for (int j = 0; j < subStr.length() / 2 - 1; j++) {
//                            sb.setCharAt(start + 1 + j, startChar);
//                            sb.setCharAt(i - 1 - j, endChar);
//                        }
//                    }
//                    change = true;
//                }
//                if (i == dominoes.length() - 1 && endChar == '.') {
//                    if (startChar == 'R') {
//                        for (int j = start + 1; j <= end; j++) {
//                            sb.setCharAt(j, 'R');
//                        }
//                        change = true;
//                    }
//                }
//                if (startChar == 'L' && endChar == 'R') {
//                    change = true;
//                }
//                // 2. 修改start值
//                if (change) {
//                    start = i;
//                }
//            }
//        }
//        return sb.toString();
//    }
    public String pushDominoes(String dominoes) {
        // 双指针 优化, 左右加入 L 和 R 好处理
        int start = 0;
        int end = 0;
        boolean change = false;
        StringBuilder sb = new StringBuilder("L" + dominoes + "R");
        for (int i = 0; i < sb.length(); i++) {
            char cur = sb.charAt(i);
            if (cur == 'R' || cur == 'L' || i == sb.length() - 1) {
                end = i;
                // 1. 处理各种情况
                String subStr = sb.substring(start, i + 1);
                char startChar = subStr.charAt(0);
                char endChar = subStr.charAt(subStr.length() - 1);
                System.out.println("sub str: " + subStr + ", start char end char: " + startChar + ", " + endChar + ", start i: "
                        + start + ", " + i
                );
                if (startChar == endChar && subStr.length() > 2) {
                    for (int j = start + 1; j < end; j++) {
                        sb.setCharAt(j, startChar);
                    }
                    change = true;
                }
                if (startChar == 'R' && endChar == 'L') {
                    // 中间, 看奇数 偶数
                    if (subStr.length() % 2 == 0) {
                        // 偶数
                        int center = subStr.length() / 2 - 1;
                        for (int j = 0; j < center; j++) {
                            sb.setCharAt(start + 1 + j, startChar);
                            sb.setCharAt(i - 1 - j, endChar);
                        }
                    } else {
                        for (int j = 0; j < subStr.length() / 2 - 1; j++) {
                            sb.setCharAt(start + 1 + j, startChar);
                            sb.setCharAt(i - 1 - j, endChar);
                        }
                    }
                    change = true;
                }
                if (startChar == 'L' && endChar == 'R') {
                    change = true;
                }
                // 2. 修改start值
                if (change) {
                    start = i;
                }
            }
        }
        sb.deleteCharAt(0);
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }


    public static void main(String[] args) {
        JavaTest002_838 javaTest002_838 = new JavaTest002_838();
        String domino = ".L.R...LR..L..";
//        String domino = "RR.L";
//        String domino = ".L.R.";
//        String domino = ".R..L.";
        System.out.println(javaTest002_838.pushDominoes(domino));
        System.out.println(domino);
    }
}

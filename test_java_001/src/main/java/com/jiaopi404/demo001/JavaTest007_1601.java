package com.jiaopi404.demo001;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class JavaTest007_1601 {
    public int maximumRequests(int n, int[][] requests) {
        int result = 0;

        Map<Integer, Integer> leftMap = new HashMap<>();
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            leftMap.put(i, 0);
            inMap.put(i, 0);
        }
        for (int[] req : requests) {
            int leftBuildingCode = req[0];
            int inBuildingCode = req[1];
            leftMap.put(leftBuildingCode, leftMap.get(leftBuildingCode) + 1);
            inMap.put(inBuildingCode, inMap.get(inBuildingCode) + 1);
        }

        // 统计结果
        for (int i = 0; i < n; i++) {
            int leftNum = leftMap.get(i);
            int inNum = inMap.get(i);
            if (leftNum == inNum) {
                result += leftNum;
            } else {
                result += Math.min(leftNum, inNum);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        JavaTest007_1601 javaTest007_1601 = new JavaTest007_1601();
//        int[][] param = {{0,1},{1,0},{0,1},{1,2},{2,0},{3,4}};
        int[][] param = {{2,0},{0,1}};
//        int[][] param = {{0,0},{1,1},{0,0},{2,0},{2,2},{1,1},{2,1},{0,1},{0,1}};

        
        
        int result = javaTest007_1601.maximumRequests(3, param);
        System.out.println("param: " + Arrays.deepToString(param));
        System.out.println("result: " + result);
    }
}

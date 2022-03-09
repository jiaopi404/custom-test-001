package com.jiaopi404.demo001;

import java.util.Arrays;
import java.util.StringJoiner;

public class JavaTest009_553 {
    public String optimalDivision(int[] nums) {
        int len = nums.length;
        if (len == 1) {
            return nums[0] + "";
        } else if (len == 2) {
            return nums[0] + "/" + nums[1];
        } else {
            String[] strs = new String[nums.length - 1];
            for (int i = 1; i < nums.length; i++) {
                strs[i - 1] = String.valueOf(nums[i]);
            }
            return nums[0]
                    + "/("
                    + String.join("/", strs)
                    + ")";
        }
    }

    public static void main(String[] args) {
        JavaTest009_553 javaTest009_553 = new JavaTest009_553();

        int[] nums = {1000, 100, 10, 2};

        String result = javaTest009_553.optimalDivision(nums);

        System.out.println("result is: " + result);
    }
}

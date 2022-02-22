package com.jiaopi404.demo001;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JavaTest003_1994 {
    public int numberOfGoodSubsets(int[] nums) {

        int goodSetSum = 0;

        int sum = 0;
        for (int item : nums) {
            sum += item;
        }
        if (sum == nums.length) {
            return 0;
        }


        // i 表示 size
//        for (int i = 1; i < nums.length; i++) {
//            for (int j = 0; j < nums.length - i; j++) {
//                int[] subSet = Arrays.copyOfRange(nums, j, j + i);
//                if (ifGoodSet(subSet)) {
//                    System.out.println("goodSet: " + Arrays.toString(subSet));
//                    goodSetSum++;
//                }
//            }
//        }

        for (int i = 0; i < Math.pow(2, nums.length); i++) {// 集合子集个数=2的该集合长度的乘方
            ArrayList<Integer> subSet = new ArrayList<Integer>();
            int index = i;// 索引从0一直到2的集合长度的乘方-1
            for (int j = 0; j < nums.length; j++) {
                // 通过逐一位移，判断索引那一位是1，如果是，再添加此项
                if ((index & 1) == 1) {// 位与运算，判断最后一位是否为1
                    subSet.add(nums[j]);
                }
                index >>= 1;// 索引右移一位
            }
            int[] subSetArr = new int[subSet.size()];
            for (int k = 0; k < subSetArr.length; k++){
                subSetArr[k] = subSet.get(k);
            }
            if (ifGoodSet(subSetArr)) {
                System.out.println("goodSet: " + Arrays.toString(subSetArr));
                goodSetSum++;
            }
        }

        return goodSetSum;
    }

    public boolean ifGoodSet(int[] subNums) {
        // 1. 好子集，所有数字，化简为质数之后是否有相同的

        ArrayList<Integer> subPrimeList = new ArrayList<>();

        // 遍历
        // 1.1 如果是质数 or 1，ok
        // 1.2 如果非质数，化简为质数，放到数组，判断 firstIndexOf 是不是 = tmpSet.length() - 1，如果是则继续，不是则返回 false
        for (int i = 0; i < subNums.length; i++) {
            int cur = subNums[i];

            if (cur == 1) { // ok 不影响结果
                subPrimeList.add(cur);
            }

            if (this.ifPrime(cur)) {
                subPrimeList.add(cur);
                if (subPrimeList.indexOf(cur) != subPrimeList.size() - 1) {
                    return false;
                }
            } else {
                ArrayList<Integer> primeList = this.toPrimeList(cur, new ArrayList<>());
                for (int subCur : primeList) {
                    subPrimeList.add(subCur);
                    if (subPrimeList.indexOf(subCur) != subPrimeList.size() - 1) {
                        return false;
                    }
                }
            }
        }
        // 如果所有都是 1，也是不行滴
        int sum = 0;
        for (int subPrime : subPrimeList) {
            sum += subPrime;
        }
        if (sum == subPrimeList.size()) {
            return false;
        }

        return true;
    }

    /**
     * 转为质数
     * @param num
     * @return
     */
    public ArrayList<Integer> toPrimeList(int num, ArrayList<Integer> resultList) {
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                resultList.add(i);
                // 如果结果不是质数，则再来一次
                int result = num / i;
                if (!this.ifPrime(result)) {
                    return toPrimeList(result, resultList);
                } else {
                    resultList.add(result);
                    return resultList;
                }
            }
        }
        return resultList;
    }

    public boolean ifPrime(int num) {
        // 1. 找到所有的质数, 小于等于 30
        List<Integer> primeList = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);

        return primeList.contains(num);
    }

    public static void main(String[] args) {
        JavaTest003_1994 javaTest003_1994 = new JavaTest003_1994();

//        int result = javaTest003_1994.numberOfGoodSubsets(new int[]{1, 2, 3,4});
//        int result = javaTest003_1994.numberOfGoodSubsets(new int[]{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1});
        int result = javaTest003_1994.numberOfGoodSubsets(new int[]{5,10,1,26,24,21,24,23,11,12,27,4,17,16,2,6,1,1,6,8,13,30,24,20,2,19});

        System.out.println("数量：" + result);
    }
}

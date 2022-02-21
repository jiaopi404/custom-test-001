package com.jiaopi404.demo001;

import java.util.Arrays;

public class JavaTest001 {

    public static int findCenter(int[][] edges) {
        int[] edge1 = edges[0];
        int[] edge2 = edges[1];
        Arrays.asList();
        if (Arrays.asList(edge2[0], edge2[1]).contains(edge1[0])) {
            return edge1[0];
        }
        if (Arrays.asList(edge2[0], edge2[1]).contains(edge1[1])) {
            return edge1[1];
        }
        return 0;
    }

    public static void main(String[] args) {
        int[][] edges = {{1, 2}, {2, 3}};
        System.out.println(findCenter(edges));
    }
}

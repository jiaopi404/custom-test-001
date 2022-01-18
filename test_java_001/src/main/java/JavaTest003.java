import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class JavaTest003 {
    public int[] twoSum(int[] nums, int target) {
        // 使用 hashMap
        int len = nums.length;
        Map<Integer, Integer> hashMap = new HashMap<>();

        hashMap.put(nums[0], 0);
        for (int i = 1; i < len; i++) {
            int another = target - nums[i];
            if (hashMap.containsKey(another)) {
                return new int[]{ hashMap.get(another), i };
            }
            hashMap.put(nums[i], i);
        }
        return new int[0];
    }
    public static void main(String[] args) {
        JavaTest003 javaTest003 = new JavaTest003();
        int[] nums = new int[] { 3,2,4 };
        System.out.println(Arrays.toString(javaTest003.twoSum(nums, 6)));
    }
}



import java.util.Scanner;

public class JavaTest002 {
    public static void main(String[] args) {
        try {
            System.out.println("请输入第一个整数：");
            Scanner scanner = new Scanner(System.in);
            int x = scanner.nextInt();
            System.out.println("请输入第二个整数：");
            int y = scanner.nextInt();
            int sum = x + y;
            int sub = x - y;
            int multi = x * y;
            int divide = x / y;
            int remain = x % y;
            System.out.println("两数相加的结果为：" + sum);
            System.out.println("两数相减的结果为：" + sub);
            System.out.println("两数相乘的结果为：" + multi);
            System.out.println("两数相除的结果为：" + divide);
            System.out.println("两数取余数的结果为：" + remain);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
    }
}

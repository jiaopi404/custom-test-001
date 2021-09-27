import java.util.Scanner;

public class JavaTest001 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入姓名：");
        String name = scanner.next();
        System.out.println("请输入年龄：");
        int age = scanner.nextInt();
        System.out.println("姓名：" + name);
        System.out.println("年龄：" + age);
    }
}

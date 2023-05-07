import java.util.Random;
public class random类_nextInt {
    public static void main(String[] args) {
        Random r = new Random();
        System.out.println("使用r对象随机生成int取值范围内的5个数");
        for (int x = 0; x < 5; x++) {
            System.out.println(r.nextInt());
        }
        System.out.println("使用r对象随机生成5个10以内的整数");
        for (int x = 0; x < 5; x++) {
            System.out.println(r.nextInt(10));
        }
        System.out.println(r.nextDouble());

    }
}

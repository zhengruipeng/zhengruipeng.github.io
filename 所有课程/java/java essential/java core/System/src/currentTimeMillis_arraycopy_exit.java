import java.util.Arrays;

public class currentTimeMillis_arraycopy_exit {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 5 };
        int[] arr2 = { 5, 6, 7, 8, 9 };
        long time = System.currentTimeMillis();
        System.out.println("系统当前时间是："+time);
        System.arraycopy(arr, 3, arr2, 3, 2);
        System.out.println("数组arr的内容是："+ Arrays.toString(arr));
        System.out.println("数组arr2的内容是："+Arrays.toString(arr2));
        System.exit(100);
        System.out.println("HelloWorld");
    }


}

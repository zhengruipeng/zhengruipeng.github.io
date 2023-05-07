public class replace_split_trim {
    public static void main(String[] args) {
        String s = "helloworld";
        System.out.println("将字符串s中的字符l替换成p后："+s.replace('l', 'p'));
        System.out.println("将字符串s中的字符ll替换成ak47后："+
                s.replace("ll", "ak47"));
        String ages = "20-30";
        String[] strArray = ages.split("-");
        for (int x = 0; x < strArray.length; x++) {
            System.out.println("strArray数组中的索引为"+x+"处的值是："
                    +strArray[x]);
        }
        String name = "  admin hello      ";
        System.out.println("去掉首尾空格后的字符串name：" + name.trim());
        String s1 = "hello";
        String s2 = "aello";
        System.out.println("按照默认字典的顺序比较字符串s1和s2："+
                s1.compareTo(s2));// 7
    }

}

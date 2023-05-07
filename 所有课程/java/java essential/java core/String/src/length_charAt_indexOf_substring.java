public class length_charAt_indexOf_substring {
    public static void main(String[] args) {
        String s = "HelloWorld";
        System.out.println("字符串s是："+s);
        System.out.println("字符串s的长度是："+s.length());
        System.out.println("字符串s中第3个字符是："+s.charAt(2));
        System.out.println("字符串s中第一次出现'l'字符的索引是："+s.indexOf('l'));
        System.out.println("从字符串s的第5个字符开始，出现字符'l'的索引是："
                +s.indexOf('l', 4));
        System.out.println("字符串s中第5个字符到结尾组成的新字符串是："+s.substring(4));
        System.out.println("字符串s中由第5个到第9个字符组成的新串是："+s.substring(4, 8));
    }

}

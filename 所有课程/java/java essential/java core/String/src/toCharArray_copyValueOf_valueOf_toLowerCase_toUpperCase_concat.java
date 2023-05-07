public class toCharArray_copyValueOf_valueOf_toLowerCase_toUpperCase_concat {
    public static void main(String[] args) {
        String s = "HelloWorld";
        System.out.println("字符串s是："+s);
        System.out.println("***********字符串的转换和拼接操作***********");
        char[] chs = s.toCharArray();
        System.out.println("***********遍历chs数组***********");
        for (int x = 0; x < chs.length; x++) {
            System.out.println(chs[x]);
        }
        System.out.println("-----------------");
        char[] chs2 = { 'a', 'b', 'c', '中', '国' };
        System.out.println("通过String类的copyValueof()方法将字符数组chs2转换成字符串："+
                String.copyValueOf(chs2));
        System.out.println("-----------------");
        System.out.println("通过String类的valueOf ()方法将字符数组chs2转换成字符串："+
                String.valueOf(chs2));
        System.out.println("-----------------");
        int i = 100;
        System.out.println("通过String类的valueOf ()方法将int类型的100转换成字符串："+String.valueOf(i));
        System.out.println("-----------------");
        System.out.println("字符串s的小写形式："+s.toLowerCase());
        System.out.println("字符串s的大写形式："+s.toUpperCase());
        System.out.println("-----------------");
        System.out.println("字符串s拼接'world'后，生成的新字符串是："+s.concat("world"));			   }

}

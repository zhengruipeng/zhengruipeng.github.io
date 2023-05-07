public class StringBuffer_replace_substring_reverse {
    public static void main(String[] args) {

        StringBuffer sb = new StringBuffer();
        sb.append("hello").append("world").append("java");
        System.out.println("追加字符串后的sb:"+sb);
        System.out.println("****字符序列的替换方法**** ");
        sb.replace(5, 10, "林青霞");
        System.out.println("使用replace()方法替换后的sb:"+sb);
        System.out.println("****字符序列的截取方法**** ");
        String s = sb.substring(5);
        System.out.println("使用substring()方法截取后的s:"+s);
        System.out.println("sb:"+sb);
        System.out.println("****字符序列的反转方法**** ");
        sb.reverse();
        System.out.println("使用reverse()方法反转后的sb:"+sb);
    }

}

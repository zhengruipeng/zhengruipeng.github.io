public class equals_contains_startsWith_isEmpty {
    public static void main(String []args){
        String s = "HelloWorld";
        System.out.println("s是和HelloWorld相等："+s.equals("helloWorld"));
        System.out.println("（不区分大小写）字符串s和'helloworld'相等："
                +s.equalsIgnoreCase("helloworld"));
        System.out.println("字符串s中包含'or'："+s.contains("or"));
        System.out.println("字符串s以'Hel'开头："+s.startsWith("Hel"));
        System.out.println("字符串s为空："+s.isEmpty());

    }
}

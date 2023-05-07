public class StringBuffer_append_insert_deleteCharAt_delete {
    public static void main(String[] args) {
        // 创建对象
        StringBuffer sb = new StringBuffer();
        System.out.println("sb:" + sb);
        System.out.println("****StringBuffer的添加方法****");
        sb.append(100).append("hello").append(true).append(12.5);
        System.out.println("使用StringBuffer对象添加任意数据类型的数据后sb:" + sb);
        sb.insert(8, "world");
        System.out.println("在sb的第9个位置插入'world'字符串后sb:" + sb);
        System.out.println("****StringBuffer的删除方法****");
        sb.deleteCharAt(1);
        System.out.println("删除sb中第2个位置的字符后sb:" + sb);
        sb.delete(5, 10);
        System.out.println("删除sb中第6个到第11个字符后的sb:" + sb);
    }

}

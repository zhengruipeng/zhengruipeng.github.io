public class 显示隐式类型转换 {
    static public void main(String[] args){
        int a = 65539;
        short b = (short)a;
        byte c = (byte)a;
        long d = a;
        double e = 33333333.14159265350891;
        float f = (float)e;
        System.out.print(a+"\n");
        System.out.print(b+"\n");
        System.out.print(c+"\n");
        System.out.print(d+"\n");
        System.out.print(e+"\n");
        System.out.print(f+"\n");
        System.out.println(0.2+0.1);
        System.out.println(0.2f+0.1f);
    }
}

abstract class I{
    abstract public void fun(int a);
}
class J extends I{
    public void fun(int a){
        System.out.println("fun实现");
    }
}
public class six {
    public static void main(String[] args){
        (new J()).fun(123);
    }
}

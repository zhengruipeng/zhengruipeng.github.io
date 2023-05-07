class A{
    public int a;
}
class B extends A{
    public int b;
}
public class test {
    static public void main(String[] args){
        B b = new B();
        b.a = 123;
        b.b = 321;
        System.out.println(b.a);
        System.out.println(b.b);
    }
}

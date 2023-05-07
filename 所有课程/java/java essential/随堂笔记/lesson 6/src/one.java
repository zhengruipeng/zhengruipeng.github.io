interface A{
    int  a  = 331;
    void fun();
    default void foo(String type){
        System.out.println(type);
    }
}
interface B extends A{
    void fun2();
}
class C implements B {
    @Override
    public void fun() {
        System.out.println("fun");
    }
    @Override
    public void fun2() {
        System.out.println("fun2");
    }
}
public class one {
    static public void main(String[] args){
        C c = new C();
        c.fun();
        c.fun2();
        System.out.println(A.a);
        c.foo("123123");
    }
}

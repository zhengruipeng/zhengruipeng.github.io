interface D{
    int  a  = 331;
    void fun();
    default void foo(String type){
        System.out.println(type);
    }
}
interface E {
    void fun2();
}
class F implements D,E {
    @Override
    public void fun() {
        System.out.println("fun");
    }
    @Override
    public void fun2() {
        System.out.println("fun2");
    }
}
public class two {
    static public void main(String[] args){
        F f = new F();
        f.fun();
        f.fun2();
        f.foo("123123");
        System.out.println(A.a);

    }
}

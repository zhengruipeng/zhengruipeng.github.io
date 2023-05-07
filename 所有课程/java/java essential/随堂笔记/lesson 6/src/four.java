interface J{
    void fun();
}
class K implements J{
    @Override
    public void fun(){
        System.out.println("fun");
    }
    public void fun2(){
        System.out.println("fun2");
    }
}
class L implements J{
    @Override
    public void fun(){
        System.out.println("fun3");
    }
}
public class four {
    static public void main(String[] args){
        J k = new K();
        k.fun();
        //k.fun2();  父类变量只能调用父类已声明的方法
//        k = (L)k;
//        k.fun();
        System.out.println(k instanceof J);
        System.out.println(k instanceof K);
        System.out.println(k instanceof L);
    }
}

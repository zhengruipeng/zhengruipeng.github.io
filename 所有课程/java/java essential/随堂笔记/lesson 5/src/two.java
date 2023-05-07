class C{
    public int a;
    void fun(){

    }
}
class D extends C{
    public int b;
    //返回值和参数列表均要相等
    void fun(){
        System.out.println("重写");
    }
}
public class two {
    static public void main(String[] args){
        D d = new D();
        d.fun();
    }
}

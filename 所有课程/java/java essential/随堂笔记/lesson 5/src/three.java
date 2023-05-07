class E{
    public int a;
    public E(){

    }
    void fun(){
        System.out.println("父类");
    }
}
class F extends E{
    public int b;
    public F(){
        super();
    }
    void fun(){
        System.out.println("重写");
        super.fun();
    }
}
public class three {
    static public void main(String[] args){
        (new F()).fun();
    }
}

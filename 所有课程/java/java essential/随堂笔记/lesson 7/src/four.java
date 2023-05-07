interface I1{
    public void foo();
}
abstract class Ab1{
    abstract public void bar();
}
public class four {
    static public void main(String[] args){
         I1 i = new I1(){
            public void foo(){
                System.out.println("foo");
            }
        };
         i.foo();
        Ab1 ab = new Ab1(){
            @Override
            public void bar(){
                System.out.println("bar");
            }
        };
        ab.bar();
    }
}

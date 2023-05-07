class A{
    protected void finalize(){
        System.out.println("GC");
    }
}
public class gcTest {
    static public void  recycle1(){
        A a = new A();
        a = null;

        for(int i = 0;i<100;i++){
            System.out.println("looping1: "+i);
        }
    }
    static public void  recycle2(){
        A a = new A();
        a = null;

        System.gc();
        for(int i = 0;i<100;i++){
            System.out.println("looping2: "+i);
        }
    }
    static public void main(String[] args){
        recycle1();
        recycle2();
    }
}

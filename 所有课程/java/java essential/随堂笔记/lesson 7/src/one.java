class Outer{
    int a = 1;
    int b = 2;
    void printa(){
        System.out.println(this.a);
    }
    Outer that = this;
    class Inner{
        int a = 3;
        void printa(){
            System.out.println(this.a);
            System.out.println(that.b);
        }
    }
    void getAB(){
        System.out.println(this.a);
        Inner i = new Inner();
        i.printa();
    }
}
public class one {
    static public void main(String[] args){
        Outer o = new Outer();
        Outer.Inner i = o.new Inner();
//        o.printa();
        o.getAB();
//        i.printa();
        o.b = 222;
        o.getAB();

    }
}

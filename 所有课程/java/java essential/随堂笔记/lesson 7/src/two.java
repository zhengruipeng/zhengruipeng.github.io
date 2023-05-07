class Outer2{
    int a = 1;
    int b = 2;
    private Outer2 that = this;
    void printa(){
        System.out.println(this.a);
    }
    void foo(){
        class Inner2{
            int a = 1;
            void printa(){
                System.out.println(this.a);
                System.out.println(Outer2.this.b);
            }
        }
        Inner2 i = new Inner2();
        i.printa();
    }
}
public class two {
    static public void main(String[] args){
        Outer2 o = new Outer2();
        o.foo();
//        o.foo().new Inner2();
    }
}

class Outer3{
    int a = 1;
    static int sa = 1;
    static class Inner3{
        int a = 2;
        static int sa = 1;

        public void printa(){
            System.out.println(this.a);
            //System.out.println(Outer3.this.a);
            System.out.println(Outer3.sa);
        }
        static public void printb(){
//            System.out.println(this.a);
            System.out.println(Inner3.sa);
        }
    }
}
public class three {
    static public void main(String[] args){
        Outer3.Inner3 i = new Outer3.Inner3();
        i.printa();
        Outer3.Inner3.printb();
    }
}

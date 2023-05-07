class A{
    private int a = 2;

    public void setA(int a) {
        this.a = a;
    }

    public int getA() {
        return a;
    }
}
interface V{
    abstract double foo(double a);
}
class B implements V{
    @Override
    public double foo(double a) {
        return a * a;
    }
}
class N implements V{
    @Override
    public double foo(double a) {
        return Math.PI * Math.pow(a,2);
    }
}
public class test2 {
    static public void main(String[] args){
        A a = new A();
        a.setA(123);
        System.out.println(a.getA());
    }
}

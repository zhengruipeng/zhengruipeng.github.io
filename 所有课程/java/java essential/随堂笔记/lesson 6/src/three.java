abstract class G{
    abstract void fun();
}
class H extends G{
    @Override
    void fun(){
        System.out.println("1st");
    }
}
class I extends G{
    @Override
    void fun(){
        System.out.println("2nd");
    }
}
public class three {
    public static void main(String[] args){
        G h = new H();
        h.fun();
        G i = new I();
        i.fun();
    }
}

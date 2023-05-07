import java.util.HashSet;
public class index {
    public static void main(String[] args){
        HashSet set = new HashSet();
        set.add(123);
        set.add(321);
        set.add(111);
        set.forEach(v -> {
            System.out.println(v);
        });
    }
}

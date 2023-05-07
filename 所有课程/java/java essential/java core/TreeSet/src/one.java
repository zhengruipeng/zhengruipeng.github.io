import java.util.TreeSet;

public class one {
    static public void main(String[] args){
        TreeSet set = new TreeSet();
        set.add(3);
        set.add(8);
        set.add(7);
        set.add(1);
        System.out.println(set);
        System.out.println(set.first());
        System.out.println(set.last());
        System.out.println(set.floor(9));
        System.out.println(set.higher(5));
        Object a = set.pollFirst();
        System.out.println(a);

    }
}

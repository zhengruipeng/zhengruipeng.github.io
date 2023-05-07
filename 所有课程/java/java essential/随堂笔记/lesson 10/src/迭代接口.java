import java.util.ArrayList;
import java.util.Iterator;

public class 迭代接口 {
    static public void main(String[] args){
        ArrayList list = new ArrayList();
        list.add(123);
        list.add(321);
        list.add(111);
        list.add(222);
        list.forEach(v -> {
            System.out.println(v);
        });
        Iterator iter = list.iterator();
        iter.forEachRemaining(v -> {System.out.println(v);});
    }
}

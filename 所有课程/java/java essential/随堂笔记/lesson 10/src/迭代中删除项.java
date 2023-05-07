import java.util.ArrayList;
import java.util.Iterator;

public class 迭代中删除项 {
    static public void main(String[] args){
        ArrayList list = new ArrayList();
        list.add(123);
        list.add(321);
        list.add(111);
        list.add(222);

        Iterator iter = list.iterator();
        for (; iter.hasNext(); ) {
            Object val = iter.next();
            if((int)val == 123){
                iter.remove();
                break;
            }
        }
        iter.forEachRemaining(v -> {System.out.print(v+" ");});
        System.out.println();
        iter = list.iterator();
        iter.forEachRemaining(v -> {System.out.print(v+" ");});
        System.out.println();
        list.forEach(v -> {
            System.out.print(v+" ");
        });
    }
}

import java.util.ArrayList;

public class foreach循环 {
    static public void main(String[] args){
        ArrayList list = new ArrayList();
        list.add(123);
        list.add(321);
        list.add('f');
        list.add(true);
        for (Object val:
             list) {
            System.out.println(val);
        }

    }
}

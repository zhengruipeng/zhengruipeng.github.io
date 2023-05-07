import java.util.ArrayList;

public class example1 {
    static public void main(String[] args){
        ArrayList list = new ArrayList();
        list.add(1);
        list.add("1");
        list.size();
        System.out.println(list.get(1));
        list.set(0,2);
        System.out.println(list.contains(0));
        System.out.println(list.indexOf("1"));
        list.forEach(v -> {
            System.out.print(v);
        });
        System.out.println();
        list.iterator().forEachRemaining(v -> {
            System.out.print(v);
        });
        System.out.println();
        list.listIterator().forEachRemaining(v -> {
            System.out.print(v);
        });
        list.remove(1);
        list.clear();
        list.add(1);
        list.add(1);
        list.add("2");
        list.add("2");
        list.removeIf(v -> {
            if(v instanceof String)return true;
            return false;
        });
        System.out.println();
        list.listIterator().forEachRemaining(v -> {
            System.out.print(v);
        });
        Object[] arr = list.stream().toArray();

        System.out.println();
        System.out.print(arr.length);

    }
}

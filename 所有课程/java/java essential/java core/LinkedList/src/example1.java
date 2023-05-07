import java.util.LinkedList;
import java.util.Spliterator;
import java.util.stream.Stream;

public class example1 {
    static public void main(String[] args){
        LinkedList list = new LinkedList();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.addLast(6);
        list.addFirst(0);
        Object list2 = list.clone();
        System.out.print(list2);
        System.out.println();
        System.out.print(list.contains(3));
        System.out.println();
        Object firstEle = list.peekFirst();
        list.removeFirst();
        list.removeLast();
        list.pollLast();
        list.pollFirst();
        System.out.println(list);
        list.push(5);
        System.out.println(list.pop());
        System.out.println(list);
        Spliterator sIterator = list.spliterator();
        sIterator.forEachRemaining(v -> {
            System.out.print(v);
        });
        System.out.println();

        Stream stream = list.stream();
        System.out.println(stream.count());
        System.out.println(list.stream().anyMatch(v -> (int)v == 2));
    }
}

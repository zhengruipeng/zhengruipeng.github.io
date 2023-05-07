package localhost;
import java.util.*;
public class test12 {
	public static void main(String []args){
		ArrayList<Integer> arr = new ArrayList<Integer>();
		ArrayList<Integer> arr2 = new ArrayList<Integer>();
		for(int i=0;i<10;i++){
			arr.add(i);
		}
		ListIterator i = arr.listIterator();
		while(i.hasNext()){
			System.out.print(i.next());
		}
		System.out.println();
		while(i.hasPrevious()){
			arr2.add(((Integer)i.previous()));
		}
		ListIterator ii = arr2.listIterator();
		while(ii.hasNext()){
			System.out.print(i.next());
		}
	}
}

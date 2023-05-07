package localhost;
import java.util.*;
public class index5 {
	public static void main(String []args){
		ArrayList arr = new ArrayList();
		for(int i=0;i<10;i++){
			arr.add(i);
		}
		ListIterator i = arr.listIterator();
		while(i.hasNext()){
			System.out.print(i.next());
		}
		System.out.println();
		while(i.hasPrevious()){
			System.out.print(i.previous());
		}
	}
}

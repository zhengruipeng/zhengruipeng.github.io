package localhost;
import java.util.*;
public class index2 {
	public static void main(String []args){
		/*Collection<Integer> collection = new ArrayList<Integer>(Arrays.asList(1,2,3));
		collection.addAll(Arrays.asList(1,2,3,4));
		System.out.print(collection);*/ 	
		Integer[] a = {1,2,3};
		Collection<Integer> c = new ArrayList<Integer>();
		c.addAll(Arrays.asList(a));
		System.out.print(c);
		Collections.addAll(c, 1,2);
		System.out.print(c);
		
	}
}

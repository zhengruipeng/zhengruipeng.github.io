package localhost;
import java.util.*;
public class test31 {
	public void f(Iterable it){
		System.out.print(it.iterator().next());
		for(Object s:it){
			System.out.print(s);
		}
	}
	public static void main(String []args){
		
		new test31().f(Arrays.asList(1,2,3));
	}
}

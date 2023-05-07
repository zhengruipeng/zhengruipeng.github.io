package localhost;
import java.util.*;
public class test2 {
	static public void main(String []args){
		Set<Integer> s = new HashSet<Integer>();
		s.add(1);
		s.add(2);
		s.add(3);
		for(int v : s){
			System.out.print(v);
		}
		
	}
}

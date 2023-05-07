package localhost;
import java.util.*;
public class index9 {
	static public void main(String[] args){
		List c = new ArrayList();
		c.add("a");
		c.add("b");
		c.add("c");
		c.add("e");
		c.add("d");
//		List l = new HashMap();
		System.out.print(c);
		Collections.sort(c,String.CASE_INSENSITIVE_ORDER);
		System.out.print(c);
	}
}

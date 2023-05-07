package localhost;
import java.util.*;
public class index3 {
	public static void f(Collection c){
		c.add(1);
		c.add(2);
		c.add(3);
		System.out.print(c);
	}
	public static void f(Map c){
		c.put("a","1");
		c.put("b","2");
		c.put("c","3");
		System.out.print(c);
	}
	public static void main(String[] args){
		Collection hash = new HashSet();
		Collection tree = new TreeSet();
		Collection linked = new LinkedHashSet();
		Map hMash = new HashMap();
		Map treeM = new TreeMap();
		Map linkedM = new LinkedHashMap();
		f(hash);
		f(tree);
		f(linked);
		f(hMash);
		f(treeM);
		f(linkedM);
		
	}
}

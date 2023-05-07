package localhost;
import java.util.*;
public class test24 {
	static public void main(String []args){
		Map m = new HashMap();
		m.put("a","123");
		m.put("b","234");
		m.put("c","345");
		m.put("d","465");
		Map m2 = new TreeMap();

		List arr = new ArrayList();
		for(Object s:m.keySet()){
			arr.add(s);
		}
		System.out.print(m);
		Collections.sort(arr);
		
		for(Object o:arr){
			m2.put(o,m.get(o) );
		}
		m = m2;
		System.gc();
		System.out.print(m);
		
	}
}

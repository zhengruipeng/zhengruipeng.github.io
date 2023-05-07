package localhost;
import java.util.*;
public class test18 {
	static public void main(String[] args){
		Map m = new HashMap();
		m.put("1","123");
		m.put("2","234");
		m.put("4","345");
		m.put("3","456");
		m.put("5","567");
		m.put("6","678");
//		System.out.print(m.get("1"));
		System.out.print(m.keySet());
		for(Object s: m.keySet()){
			System.out.print(s);
		}
		Map m2 = new LinkedHashMap();
		for(int i=0;i<m.size();i++){
//			int n = i+1;
			String s = i+1+"";
			m2.put(i,m.get(s));
		}
		System.out.print(m2);
	}
}

package localhost;

import java.util.*;

public class test20 {
	static public void main(String []args){
		Collection s = new HashSet();
		String arr[] = {"a","b","c","d","e","f"};
		Map res = new HashMap();
		res.put("a",0);
		res.put("b",0);
		res.put("c",0);
		res.put("d",0);
		res.put("e",0);
		res.put("f",0);
		Random rand = new Random(47);
		for(int i=0;i<400;i++){
			String ss = arr[rand.nextInt(5)];
//			System.out.print(ss);
			int ii = (Integer)res.get(ss);
			res.put(ss,ii+1);
			s.add(ss);
		}
		System.out.print(res);
	}
}

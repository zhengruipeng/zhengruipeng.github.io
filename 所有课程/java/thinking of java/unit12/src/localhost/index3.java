package localhost;

import localhost.test9.a;
import localhost.test9.b;
import localhost.test9.c;

public class index3 {
	static class a{
		a() throws Exception{
			throw new Exception("a");
		}
	}
	static class b{
		b() throws Exception{
			throw new Exception("b");
		}
	}
	static class c{
		c() throws Exception{
			throw new Exception("c");
		}
	}
	public static void main(String[] args){
		try{
			new a();
			new b();
			new c();
		}catch(Exception e){
			for(StackTraceElement ste: e.getStackTrace()){
				System.out.println(ste.getMethodName());
			}
		}
	}
}

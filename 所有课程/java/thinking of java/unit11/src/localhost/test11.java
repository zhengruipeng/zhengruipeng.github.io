package localhost;
import java.util.*;
public class test11 {
	public class a{
		Collection<String> c = new ArrayList<String>();
		private class b{
			public String toString (){return "b";}
		}
		private class c{
			public String toString (){return "c";}
		}
		private class d{
			public String toString (){return "d";}
		}
		void init(){
			a a = new a();
			a.c.add(a.new b().toString());
			a.c.add(a.new c().toString());
			a.c.add(a.new d().toString());
			Iterator i = a.c.iterator();
			while(i.hasNext()){
				System.out.print(i.next());
			}
		}
	}
	public static void main(String[] args){
		a aa = new test11().new a();
		aa.init();
	}
}

package localhost;
public class test9 {
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
			new NullPointerException();
		}catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getLocalizedMessage());
//			System.out.print(e.toString());
			e.printStackTrace(System.out);
		}finally{
			print p = new print();
			p.printf("123123");
		}
	}
}

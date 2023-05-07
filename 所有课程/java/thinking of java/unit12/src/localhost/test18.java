package localhost;

public class test18 {
	class a{
		void f(String s) throws Exception{
			Exception e = new Exception(s);
			throw e;
		}
	}
	public static void main(String []args){
		a a  = new test18().new a();
		try{
			try{a.f("123");
			}catch(Exception e){
				e.printStackTrace(System.out);
				a.f("321");


			}
		}catch(Exception e){
			e.printStackTrace(System.out);
		}
		
	}
}

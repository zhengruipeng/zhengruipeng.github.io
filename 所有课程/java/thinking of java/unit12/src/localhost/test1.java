package localhost;

public class test1 {
	static public class e extends Exception{}
	public class a{
		public void f() throws e{
			System.out.println("f");
			throw new e();
		}
	};
	static public void main(String []args){
		a aa = new test1().new a();
		try{
			aa.f();
		}catch(Exception e){
			System.out.println("error");
		}finally{
			System.out.println("finally");
		}
	}
} 

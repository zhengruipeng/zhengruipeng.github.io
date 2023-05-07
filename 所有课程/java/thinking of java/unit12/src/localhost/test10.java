package localhost;

public class test10 {
	static class e extends Exception{
		e(){super();}
	}
	static class e2 extends Exception{
		e2(){
			super("e2");
			System.out.print(getMessage());
			}
	}
	class a{
		void f(){
			try{
				new test10().new a().g();
			}catch(Exception e){
				System.out.println(e.getMessage());
				new e2();
			}
		}
		void g() throws Exception{
			throw new RuntimeException("123");
		}
	}
	static public void main(String []args){
		print p = new print();
		p.println("123");
		new test10().new a().f();
	}
}

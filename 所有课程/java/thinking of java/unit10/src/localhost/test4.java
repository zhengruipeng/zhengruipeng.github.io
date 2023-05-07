package localhost;

public class test4 {
	public static class A{
		class B{
			A f(){return A.this;}
			void g(){System.out.print("123");}
		}
	}
	static public void main(String []args){
		new A().new B().f().new B().g();
	}
}

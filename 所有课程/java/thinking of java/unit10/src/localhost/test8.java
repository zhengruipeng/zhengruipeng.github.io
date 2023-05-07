package localhost;

public class test8 {
	public static class A{
		class B{
			private int a = 1;
		}
		void f(){System.out.print(new B().a);};
		
	}
	static public void main(String []args){
		new A().f();
//		System.out.print(A.B.a);
	}
}

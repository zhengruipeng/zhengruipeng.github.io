package localhost;

public class test7 {
	public static class A{
		private int i;
		private void f(){System.out.print(i);};
		class B{
			B g(int a){i = a;return new B();}
			void h(){A.this.f();}
		}
	}
	static public void main(String[] args){
		new A().new B().g(2).h();
	}
}

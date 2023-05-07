package localhost;

public class test6 {
	public static class A{
		private class B{
			void f(){System.out.print("12");}
		}
		public B g(){
			return new B();
		}
	}
	static public void main(String []args){
		new A().g().f();
	}
}

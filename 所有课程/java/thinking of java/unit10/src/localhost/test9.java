package localhost;

public class test9 {
	public void f(){
		class B{
			void g(){System.out.print("1123");}
			private int a = 0;
			public int c(){return a;}
			public void c(int i){a = i;}
		}
		new B().g();
		}
	public static void main(String []args){
		new test9().f();
	}
}

package localhost;
class tenA{
	void a(){System.out.print(1);}
	void b(){System.out.print(2);}
	void c(){System.out.print(3);}
	void d(){System.out.print(4);}
}
public class test10 {
	private tenA s = new tenA();
	public void a(){
		s.a();
	}
	public void b(){
		s.b();
	}
	public void c(){
		s.c();
	}
	public void d(){
		s.d();
	}
	static public void main(String []args){
		test10 v = new test10();
		v.a();
		v.b();
		v.c();
		v.d();
	}
}

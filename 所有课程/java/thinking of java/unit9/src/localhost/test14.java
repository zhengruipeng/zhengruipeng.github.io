package localhost;
interface T14A{
	void a();
	void b();
}
interface T14B{
	void c();
	void d();
}
interface T14C{
	void e();
	void f();
}
interface T14D extends T14A ,T14B ,T14C{
	void g();
	void h();
}
abstract class T14E implements T14D{
	public void a(){System.out.print(1);}
	public void b(){System.out.print(2);}
	public void c(){System.out.print(3);}
	public void d(){System.out.print(4);}
	public void e(){System.out.print(5);}
	public void f(){System.out.print(6);}
}
class T14F extends T14E{
	public void g(){System.out.print(7);}
	public void h(){System.out.print(8);}
}
public class test14 {
	public static void q(T14B b){b.c();b.d();}
	public static void w(T14C c){c.e();c.f();}
	public static void r(T14A d){d.a();d.b();}
	static public void main(String []args){
		T14F f = new T14F();
		q(f);
		w(f);
		r(f);
	}
}

package localhost;
interface T18A{
	void f();
}

class T18D implements T18A{
	public void f(){System.out.print("123");}
}

class T18E implements T18A{
	public void f(){System.out.print("222");}
}

class T18F implements T18A{
	public void f(){System.out.print("321");}
}
public class test18 {
	public static void g(T18A a){
		a.f();
	}
	static public void main(String []args){
		g(new T18D());
		g(new T18E());
		g(new T18F());
	} 
}

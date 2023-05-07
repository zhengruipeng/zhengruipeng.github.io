package localhost;
class T10A{
	void a(){b();};
	void b(){new T10B().c();}
}
class T10B extends T10A{
	@Override void b(){System.out.print("override");}
	static void c(){
		T10A a = new T10B();
		a.a();
	}
}
public class test10 {
	static public void main(String []args){
		new T10A().a();
	}
}

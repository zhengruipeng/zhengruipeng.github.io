package localhost;
class T17A{
	void f(){System.out.println(1);}
}
class T17B extends T17A{
	void f(){System.out.println(2);}
}
class T17C extends T17A{
	void f(){System.out.println(3);}
}
class T17D extends T17A{}
public class test17 {
	static public void main(String []args){
		T17A b = new T17B();
		T17A c = new T17C();
		T17A d = new T17D();
		b.f();
		d.f();
		((T17B)b).f();
		((T17D)d).f();
		T17A a = new T17A();
		a.f();
		
	}
}

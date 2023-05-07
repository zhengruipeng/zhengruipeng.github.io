package localhost;
class T2A{
	void f(){
		System.out.print(1);
	}
}
class T2B extends T2A{
	void f(){
		System.out.print(2);
	}
}
public class test2 {
	static public void main(String []args){
		T2B b = new T2B();
		b.f();
	}
}

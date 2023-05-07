package localhost;
class stA{
	void f(stA a){
		System.out.print("123");
	}
}
class stB extends stA{
	void a(){
		stB a = new stB();
		super.f(a);
	}
}
public class test16 {
	static public void main(String []args){
		stB a = new stB();
		a.a();
	}
}

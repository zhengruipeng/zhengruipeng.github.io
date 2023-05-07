package localhost;
class A{
	A(){
		System.out.print("a()");
	}
	void f(){
		System.out.println("af");

	}
	
}
public class Model {
	static public void main(String []args){
		System.out.print("onload");
	}
	static void f(){
		System.out.print("f");

	}
}

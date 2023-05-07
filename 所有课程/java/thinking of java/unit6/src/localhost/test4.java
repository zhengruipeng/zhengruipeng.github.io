package localhost;
class Parent{
	Parent(){
		System.out.print("super");
	}
	static protected void f(){
		System.out.print("protected");
	}
	protected void g(){
		System.out.print("public");
	}
}
public class test4 {
	static public void main(String []args){
		Parent parent = new Parent();
		parent.f();
		parent.g();
	}
}

package localhost;
class ftA{
	protected void f(){
		System.out.print("f");
	}
}
class ftB extends ftA{
	ftB(){
		f();
	}
}
public class test15 {
	static public void main(String []args){
		new ftB();
	}
}

package localhost;
class T22B{
	T22B(){
		System.out.print("b()");
	}
}
public class test23 extends T22B{
	test23(){
		
	}
	static public void main(String []args){
		System.out.print("a()");
		new test23();

	}
}

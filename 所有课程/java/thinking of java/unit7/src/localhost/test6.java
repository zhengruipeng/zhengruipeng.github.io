package localhost;
class sixA{
	sixA(){
		System.out.print("A");
	}
}
class sixB{
	sixB(){
		System.out.println("B");
		new sixA();
	}
	static sixA other(){
		return new sixA();
	}
}
public class test6 {
	static public void main(String []args){
		sixA a = new sixB().other();
		System.out.print(a);
	}
}

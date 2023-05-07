package localhost;
class UA{
	void f(){System.out.print("1");}
}
class UB extends UA{
	void f(){System.out.print(2);}
	void g(){System.out.print(2);}
}
public class Useful {
	static public void main(String []args){
		UA b = new UB();
//		b.g();
	}
}

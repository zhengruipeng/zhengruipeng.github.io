package localhost;
class T5A{
	class A{
		void f(){System.out.print("f");}
	}
}
public class test5 {
	static public void main(String []args){
		new T5A().new A().f();
	}
}

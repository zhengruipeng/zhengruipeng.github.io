package localhost;
class T1A{
	private static String s = "123";
	class A{
		A f(){System.out.print(1);return new A();}
		void h(){
			System.out.print(s);
		}
	}
	public A g(){return new A();}
}
public class test1 {
	static public void main(String []args){
		new T1A().g().f().h();
	}
}

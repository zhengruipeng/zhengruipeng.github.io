package localhost;
class A{
	static String s;
	static String s2;
	A(){
		s = "123";
	}
	static void print(){
		System.out.print(s+s2);
	}
	static {
		s2 = "321";
	}
	
}
public class test14 {
	static public void main(String[] args){
		new A().print();
	}
}

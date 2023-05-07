package localhost;
class B{
	B(int i){
		System.out.print(i);
	}
}
class Test{
	static B b = new B(1);
	B b2 = new B(2);
	static B b3 = new B(3);
	
	
}
public class sequence {
	static public void main(String[] args){
		Test test = new Test();
	}
}

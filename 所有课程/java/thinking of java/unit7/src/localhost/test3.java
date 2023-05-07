package localhost;
class Test3S{
	Test3S(){
		System.out.print("super");
	}
}

public class test3 extends Test3S{
	test3(){
		System.out.print("chlid");
	}
	static public void main(String []args){
		new test3();
	}
}

package localhost;

public class test9 {
	static class A{ 
		A(){
			this((int)1);
		}
		A(int i){
			System.out.print(i);
		}
	}
	static public void main(String[] args){
		A a = new A();
	}
}

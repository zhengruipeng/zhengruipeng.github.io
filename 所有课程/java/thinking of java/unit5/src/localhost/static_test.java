package localhost;

public class static_test {
	static class A{
		int i = 0;
		static int f(){
			//this.i++;			//��̬�����޷�����static
			return (int)1;
		}
	}
	static public void main(String[] args){
		A a = new A();
		System.out.print(a.f());
	}
}

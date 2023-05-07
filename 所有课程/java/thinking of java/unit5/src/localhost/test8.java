package localhost;

public class test8 {
	static class Test{
		void a(){
			b();
			b();
				
		}
		Test b(){
			System.out.print(1);
			return this;
		}
	}
	static public void main(String[] args){
		Test test = new Test();
		test.a();
	}
}

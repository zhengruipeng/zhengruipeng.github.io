package localhost;
public class test21{
	class B{
		B(){
//			throw new Exception("123123");
			
			//i can`t catch this error in the constructor B
		}
	}
	
	class A extends B{
		A(){
		try{
			new test21().new B();
			System.out.print("A");
		}catch(Exception e){
			System.out.print(e.getMessage());
		}
			
		}
	}
	public static void main(String []args){
		new test21().new A();
	}
}
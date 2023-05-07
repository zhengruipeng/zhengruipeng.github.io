package localhost;

public class test2 {
	static public class a{
		
	}
	static public void main(String []args){
		try{
			new a();
		}catch(Exception e){
			System.out.print("catch");

		}finally{
			System.out.print("finally");
		}
	}
}

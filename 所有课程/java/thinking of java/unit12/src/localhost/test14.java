package localhost;

public class test14 {
	static public void f() throws Exception{
		throw new RuntimeException("f");
	}
	static public void main(String []args){
		sw s = new sw();
		try{
			s.on();
			f();
		}catch(Exception e){
			System.out.println(e);
		}finally{
			System.out.println("fi");
			s.off();


		}
	}
}

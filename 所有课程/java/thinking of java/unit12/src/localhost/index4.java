package localhost;

public class index4 {
	public void f() throws Exception{
		try{
			throw new Exception("123123");
		}catch(Exception e){
			e.printStackTrace(System.out);
			throw e;
		}
	}
	public static void main(String []args){
		try{
			new index4().f();
		}
		catch(Exception e){
			for(StackTraceElement s:e.getStackTrace()){
				System.out.println(s.getMethodName());
			}
		}
	}
}

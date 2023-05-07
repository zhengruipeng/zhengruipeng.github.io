package localhost;
public class test8 {
	static void f() throws Exception{			//没有throws Exception 字样无法通过编译
		throw new Exception();
	}
	public static void main(String []args){
		try{
			f();
		}catch(Exception e){
			System.out.print("success");
		}
	}
}

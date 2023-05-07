package localhost;

import java.util.*;

public class test4 {
	static public class s extends Exception{}
	static public class e extends RuntimeException{
		e() throws Exception{
			runTime(2);
			runTime(1);
		}
		public static void runTime(int i) throws Exception{
			try{
				if(i==1){
					throw new s();
				}else{
					throw new e();
				}
			}catch(Exception e){
				throw new RuntimeException(e);
			}
			
			
			
		}
		
	}
	
	static public class a{
		private String s;
		a f(String a){
			s = a;
			System.out.print(s);
			return new a();
		}
		/*void f() throws e{
			throw new e();
		}*/
	}
	public static void main(String []args) throws Exception{
		/*try{
			new a().f("123").f();
			
		}catch(Exception e){
			System.out.print("catch");
		}*/
		try{
			new a().f("321");
			new e();
		}catch(Exception e){
			try{
				e.getCause();
			}catch(RuntimeException re){
					System.out.print(re);
				
			}
			
		}
		
	}
}

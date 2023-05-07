package localhost;

import java.util.*;
public class test22 {
	class A{
		void f() throws Exception{
			double a = Math.random()*2;
			if(a>1){
				throw new Exception("error");
			}else{
				System.out.print("lucky dog");
			}
		}
	}
	public static void main(String []args){
		try{
			new test22().new A().f();

		}catch(Exception e){
			System.out.print(e.getMessage());
		}
	}
}

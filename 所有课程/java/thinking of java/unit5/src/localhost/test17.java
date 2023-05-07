package localhost;

import java.util.Arrays;

class F{
	
	void b(){
		System.out.print("b");
	}
	void c(){
		System.out.print("c");
	}
	F(){
		System.out.print("F()");
		F res[];
		F f = new F();
		
		/*for(int i=0;i<3;i++){
			res[] = 
		}*/
	}
	
}
public class test17 {
	static public void main(String[] args){
		F f = new F();
//		F f[] = {new F().b};
	}
}

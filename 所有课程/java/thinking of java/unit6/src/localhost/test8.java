package localhost;
import java.util.*;
class ConnectionManager{
	static private int Connection[] = {1,2,3,4,5};
	static public void f(){
		for(int a :Connection){
			System.out.print(a);
		}
	}
}
public class test8 {
	static public void main(String[] args){
		ConnectionManager.f();
	}
	
	
}	

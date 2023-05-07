package localhost;
import java.util.*;
public class test3 {
	static public void main(String []args){
		ArrayList a = new ArrayList();	
		a.add(1);
		try{
			a.get(011);
		}catch(Exception e){
			System.out.print("123123");
		}
	}
}

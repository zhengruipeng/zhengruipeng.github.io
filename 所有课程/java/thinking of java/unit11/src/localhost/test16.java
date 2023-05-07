
package localhost;
import java.util.*;
public class test16 {
	class a{
		 private Set<Integer> arr = new HashSet<Integer>();
		 void init(){
			 for(int i=0;i<123;i++){
				 arr.add(i);
			 }
		 }
		 void print(){
			 System.out.println(arr);
		 }
		 void length(){
			 System.out.println(arr.size());
		 }
		 
	}
	public static void main(String []args){
		a arr = new test16().new a();
		arr.init();
		arr.length();
		arr.print();
	}
}

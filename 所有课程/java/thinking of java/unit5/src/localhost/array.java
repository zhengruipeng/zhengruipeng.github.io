package localhost;
import java.util.*;
public class array {
	static public void main(String []args){
		/*int a[] = {1,2,3,4,5};
		for(int i =0;i<10;i++){
			
		}
		System.out.print(Arrays.toString(a));*/
		Random rand = new Random(48);
		Integer a[] = new Integer[rand.nextInt(15)];
		System.out.print(rand.nextInt(30));
		for(int i=0;i<a.length;i++){
			a[i] = rand.nextInt(500);
		}
		System.out.print(Arrays.toString(a));
		
	}
}

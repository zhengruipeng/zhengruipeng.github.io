package localhost2;
import java.util.*;
public class obj {
	static void f(String ...s){
		System.out.println(Arrays.toString(s));
	}
	static void f(int []i){
		System.out.println(Arrays.toString(i));

	}
	static public void main(String[] args){
		f("123");
		int a[] = {1,2,3};
		
		f(a);
	}
}

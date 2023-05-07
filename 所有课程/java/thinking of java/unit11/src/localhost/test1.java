package localhost;
import java.util.*;
import java.util.List; 
class T1A{
	void f(){System.out.print(123);}
}
public class test1 {
	
	static public void main(String[] args){
		ArrayList<T1A> b = new ArrayList<T1A>();
		for(int i=0;i<3;i++){
			b.add(new T1A());
		}
		for(int i=0;i<b.size();i++){
			((T1A)b.get(i)).f();
		}
	}
}

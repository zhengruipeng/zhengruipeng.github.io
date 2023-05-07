package localhost;
import java.util.*;
import java.util.List; 
class T8A{
	void f(){System.out.print(123);}
}
public class test8 {
	
	static public void main(String[] args){
		ArrayList<T8A> b = new ArrayList<T8A>();
		for(int i=0;i<3;i++){
			b.add(new T8A());
		}
		Iterator ii = b.iterator();
		while(ii.hasNext()){
			System.out.print(ii.next());
		}
	}
}

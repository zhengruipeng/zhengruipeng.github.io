package localhost;
import java.util.*;

class T9A{
	void print(){System.out.print(1);}
}
class T9B extends T9A{
	void print(){System.out.print(2);}
}
class T9C extends T9A{
	void print(){System.out.print(3);}
}
class T9D extends T9A{
	void print(){System.out.print(4);}
}
public class test10 {
	static public void main(String []args){
		/*T9A a[] = {
			new T9A(),
			new T9B(),
			new T9C(),
			new T9D(),
		};*/
		ArrayList arr = new ArrayList();
		arr.add(new T9A());
		arr.add(new T9B());
		arr.add(new T9C());
		arr.add(new T9D());
		Iterator i = arr.iterator();
		while(i.hasNext()){
			((T9A)i.next()).print();
		}
		
	}
}

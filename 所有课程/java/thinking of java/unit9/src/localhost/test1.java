package localhost;
abstract class T9A{
	public abstract void print();
}
class T9B extends T9A{
	public void print(){System.out.print(2);}
	public void a(){System.out.print(2);}
}
class T9C extends T9A{
	public void print(){System.out.print(3);}
}
class T9D extends T9A{
	public void print(){System.out.print(4);}
}
public class test1 {
	static public void main(String []args){
		T9A a[] = {
			new T9B(),
			new T9C(),
			new T9D(),
		};
		for(T9A i:a){
			i.print();
		}
		((T9B)a[0]).a();
		
	}
}

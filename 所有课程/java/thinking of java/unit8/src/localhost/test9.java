package localhost;
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
public class test9 {
	static public void main(String []args){
		T9A a[] = {
			new T9A(),
			new T9B(),
			new T9C(),
			new T9D(),
		};
		for(T9A i:a){
			i.print();
		}
		
	}
}

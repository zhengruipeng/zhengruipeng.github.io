package localhost;
interface T7A{
	void print();
}
class T7B implements T7A{
	public void print(){System.out.print(2);}
}
class T7C implements T7A{
	public void print(){System.out.print(3);}
}
class T7D implements T7A{
	public void print(){System.out.print(4);}
}
public class test7 {
	static public void main(String []args){
		T7A a[] = {
			new T7B(),
			new T7C(),
			new T7D(),
		};
		for(T7A i:a){
			i.print();
		}
		
	}
}

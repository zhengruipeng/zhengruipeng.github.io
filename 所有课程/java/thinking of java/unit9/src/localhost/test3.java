package localhost;
abstract class T3A{
	abstract public void print();
}
class T3B{
	private short i = 1;
	public void print(){
		System.out.print(i);
	}
	
}
public class test3 {
	static public void main(String []args){
		T3B b = new T3B();
		b.print();
	}
}

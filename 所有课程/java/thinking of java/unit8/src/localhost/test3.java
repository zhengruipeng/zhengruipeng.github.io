package localhost;
class T3A{
	public void p(){System.out.print(1);}
}
class T3B extends T3A{
	@Override public void p(){System.out.print(2);}
}
class T3C extends T3A{
	
}
public class test3 {
	static public void main(String []args){
		new T3C().p();
	}
}

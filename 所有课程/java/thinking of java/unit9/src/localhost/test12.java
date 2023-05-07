package localhost;
interface T12A{
	void a();
}
interface T12B{
	void b();
}
class T12C{
	public void a(){
		System.out.print(1);
	}
}
class T12D extends T12C implements T12B ,T12A{
	public void b(){System.out.print(2);}
}
public class test12 {
	static public void main(String[] args){
		T12D d = new T12D();
		
		d.b();
		d.a();
	}
}

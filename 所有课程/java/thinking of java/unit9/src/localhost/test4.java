package localhost;
/*abstract */class T4A{}
class T4B extends T4A{
	public void a(){
		((T4B)new T4B()).b();
	};
	static public void b(){System.out.print("123");};
	
}
public class test4 {
	static public void main(String[] args){
		new T4B().a();
	}
}

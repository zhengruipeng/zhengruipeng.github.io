package localhost;
class Soup1{
	private Soup1(){}
	public static Soup1 f(){
		return new Soup1();
	}
}
class Soup2{
	private Soup2(){};
	private static Soup2 ps1 = new Soup2();
	public static Soup2 access(){
		return ps1;
	}
	public void g(){};
}
public class soup {
	static public void main(String[] args){
		System.out.print("123");
	}
	void b(){
		Soup1 soup = Soup1.f();
	}
	void c(){
		Soup2.access().g();
	}
}

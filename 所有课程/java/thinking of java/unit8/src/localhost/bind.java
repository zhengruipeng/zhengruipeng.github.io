package localhost;
class A{
	public void f(){System.out.print("a");}
}
class B extends A{	

}
public class bind {
	static public void main(String[] args){
		A b = new B();
		b.f();
	}
	
}

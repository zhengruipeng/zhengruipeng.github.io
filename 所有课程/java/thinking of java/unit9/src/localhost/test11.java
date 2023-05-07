package localhost;

abstract class T11A{
	public String a(Object s){
		return ((String)s).toUpperCase();
	}
	abstract void process(T11A a,Object s);
}
class T11B extends T11A{
	public void process(T11A a,Object s){
		System.out.print(a+"/"+(String)s);
		System.out.print(super.a(s));
	}
	public String toString(){return "123";}
}
public class test11 {
	static public void main(String []args){
		new T11B().process(new T11B(),"12");
	}
}

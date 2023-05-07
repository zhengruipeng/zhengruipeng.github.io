package localhost;
class T11A{
	public static int i = 0;
	public int a = 1;
}
class T11B extends T11A{
	public static int i = 1;
	public int a=  2;
}
public class test11 {
	static public void main(String []args){
		T11A a = new T11B();
		System.out.print(a.i);
		System.out.print(a.a);
	}
}

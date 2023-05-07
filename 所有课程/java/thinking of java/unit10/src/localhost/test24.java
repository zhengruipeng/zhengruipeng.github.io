package localhost;
interface T24U{
	String f();
	String g();
	String h();
}

class T24A{
	private abstract class A implements T24U{};
	A i(){
		return new A (){
			public String f(){return "f";}
			public String g(){return "g";}
			public String h(){return "h";}
		};
	};
}
class T24B{
	private T24U A = new T24A().i();
	private String arr[] = {A.f(),A.g(),A.h()};
	public Object fir(){
		return arr;
	}
	public Object sec(){
		for(int i=0;i<arr.length;i++){
			arr[i] = null;
		}
		return arr;
	}
	public void thi(){
		for(String s:arr){
			System.out.print(s);
		}
	}
}
public class test24 {
	static public void main(String []args){
		T24B b = new T24B();
		b.fir();
		b.thi();
		b.sec();
		b.thi();
	}
}

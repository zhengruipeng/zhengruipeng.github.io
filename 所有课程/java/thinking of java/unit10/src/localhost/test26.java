package localhost;
class T25a{
	class T25b{T25b(){System.out.print(123);}}
}
public class test26 extends T25a.T25b{
	test26(T25a wi){
		wi.super();
	}
	static public void main(String []args){
		T25a a = new T25a();
		test26 t = new test26(a);
	}
}

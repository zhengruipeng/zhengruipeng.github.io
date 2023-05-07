package localhost;
class T1A{
	T1A(){
		
	}
	T1A(T1A a){
		System.out.print("construct");
	}
}
class T1C extends T1A{}
class T1B extends T1A{
	T1B(){
		super(new T1C());
	}
	void f(T1A c){
		System.out.print(12);
	}
}

public class test1 {
	static public void main(String []args){
		new T1B().f(new T1C());
	}
}

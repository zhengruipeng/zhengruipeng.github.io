package localhost;
abstract class I1a{
	abstract void f();
}

public class index {
	static public I1a h(){
		class I1b extends I1a{
			private int i=0;
			public void f(){System.out.print(i);}
		}
		return new I1b();
	}
	static public void main(String []args){
		I1a a = index.h();
		a.f();
	}
}

package localhost;

class sw{
	private static print p = new print();
	sw(){
		p.println("init");
	}
	void on(){
		p.println("on");
	}
	void off(){
		p.println("off");
	}
}
public class test13 {
	static public void f() throws Exception{
		throw new RuntimeException("f");
	}
	static public void main(String []args){
		sw s = new sw();
		try{
			s.on();
			f();
			s.off();
		}catch(Exception e){
			System.out.println(e);
		}
	}
}

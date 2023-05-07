package localhost;
class ttA{
	void overload(){
		System.out.println("");
	}
	void overload(int i){
		System.out.println(i);
	}
	void overload(long l){
		System.out.println(l);
	}
}
class ttB extends ttA{
	void overload(short s){
		System.out.println(s);
	}
}
public class test13 {
	static public void main(String []args){
		ttB b = new ttB();
		b.overload((short)1);
		b.overload((int)1);
		b.overload();  
		b.overload((long)1);
		
	}
}

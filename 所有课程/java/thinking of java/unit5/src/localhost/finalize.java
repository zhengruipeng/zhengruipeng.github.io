package localhost;
class Book{ 
	boolean check;
	Book(boolean checked){
		check = checked;
	}
	protected void finalize(){
		System.out.println("123");
	}
	void f(){
		System.out.print("f()");
	}
}
public class finalize {
	static public void main(String[] args){
		 Book b = new Book(true);
		 b.f();
		 Book b2 = new Book(false);
		 b2.f();
		 System.gc();
	}
}

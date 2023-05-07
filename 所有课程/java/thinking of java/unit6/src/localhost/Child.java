package localhost;

public class Child extends Cookie{
	Child(){
		super.f();
	}
	static public void main(String []args){
		Child child = new Child();
		child.a();
	}
	private Cookie a(){
		return new Cookie();
	}
	
}

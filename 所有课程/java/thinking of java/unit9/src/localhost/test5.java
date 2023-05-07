package localhost;
interface Instrument{
	ex a(int i);
	ex b();
	ex c(float f);
}
class ex implements Instrument{
	public ex a(int i){
		System.out.print(i);
		return this;
	}
	public ex b(){
		System.out.print("b");
		return this;
	}
	public ex c(float f){
		System.out.print(f);
		return this;
	}
	
}
public class test5 {
	static public void main(String []args){
		new ex().a(1).b().c(1f);
	}
}

package localhost;
class fifC{
	fifC(){
		System.out.println("c");

	}
	private fifB b = new fifB();
	public int iB = b.i;
}
class fifA extends fifC{
	void update(int i){
		super.iB = i;
	}
}
class fifB{
	public int i = 0;
}
public class test5 {
	static public void main(String[] args){
		fifB b = new fifB();
		System.out.println(b.i);
		b.i = 123;
		System.out.println(b.i);
		fifA a = new fifA();
		a.update(321);
		System.out.println(b.i);
		System.out.println(a.iB);

	}
}

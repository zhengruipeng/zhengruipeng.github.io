package localhost;
interface T8A{
	void a(int f);
	void main();
}
public class test8 implements T8A{
	public void a(int f){System.out.print(f);}
	static public void main(String []args){
		test8 ei = new test8();
		ei.a(1);
	} 
}

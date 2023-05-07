package localhost;
interface T17A{
	int A=1,B=2,C=3;};
class T17B implements T17A{
	T17B(){
		System.out.print(A);
	}
}
public class test17 {
	public static void main(String []args){
		new T17B();
	}
}

package localhost;
class Test{
	private String i = "123";
	public String toString(){
		return i;
	}
}
public class test1 {
	static public void main(String[] args){
		Test test = new Test();
		System.out.print(test);

	}
}

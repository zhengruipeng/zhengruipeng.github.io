package localhost2;

public class enum_test {
	public enum spring{
		A,B,C
	}
	static public void main(String []args){
		for(spring s:spring.values()){
			System.out.println(s);
		}
	}
}

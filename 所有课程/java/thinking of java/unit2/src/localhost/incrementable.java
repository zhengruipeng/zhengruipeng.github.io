package localhost;

public class incrementable {
	static public void main(String[] args){
		class Cal{
			int n = 0;
			int add(){
				return this.n++;
			} 
		}
		Cal cal = new Cal();
		System.out.println(cal.add());
		System.out.println(cal.add());
	}
}

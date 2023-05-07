package localhost;
class Init{
	String s = "123";
	Init(){
		System.out.print(this.s);
	}
}
public class test1 {
	static public void main(String[] args){
		
		new Init();
	}
}

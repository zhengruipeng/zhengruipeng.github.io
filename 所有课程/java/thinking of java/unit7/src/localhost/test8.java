package localhost;
class eigA{
	/*eigA(){
		
	}*/
	eigA(int i){
		System.out.print(i);
	}
}
class eigB{
	eigB(){
		new eigA(1);
	}
	eigB(int i){
		
	}
}
public class test8 {
	static public void main(String[] args){
		new eigB();
	}
}	

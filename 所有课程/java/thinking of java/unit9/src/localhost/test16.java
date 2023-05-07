package localhost;
import java.util.*;
class T16A implements Readable{
	private static Random rand = new Random(47);
	static Double next(){
		return rand.nextDouble();
	}
	public static void main(String []args){
		for(int i=0;i<3;i++){
			System.out.print(next());
		}
	}
}
public class test16 extends T16A{
	static public void main(String []args){
		Scanner s = new Scanner(new T16A());
		while(s.hasNextDouble()){
			System.out.print(s.nextDouble());
		}
		
		
	}
}

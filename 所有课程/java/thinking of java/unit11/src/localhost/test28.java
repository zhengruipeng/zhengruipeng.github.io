package localhost;
import java.util.*;
public class test28 {
	static public void main(String []args){
		PriorityQueue p = new PriorityQueue();
		Random rand = new Random();
		for(int i=0;i<999;i++){
			p.add(rand.nextDouble());
		}
		System.out.print(p);
	}
}

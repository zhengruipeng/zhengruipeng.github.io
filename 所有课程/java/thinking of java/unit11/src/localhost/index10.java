package localhost;
import java.util.*;
public class index10 {
	static public void main(String []args){
		PriorityQueue p = new PriorityQueue();
		for(int i=0;i<10;i++){
			p.offer(i);
		}
		System.out.print(p);
	}
}
  
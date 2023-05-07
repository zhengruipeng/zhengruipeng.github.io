package localhost;
import java.util.*;
public class index4 {
	static public void main(String []args){
		ArrayList arr = new ArrayList();
		for(int i=0;i<3;i++){
			arr.add(i);
		}
		Iterator i = arr.iterator();
		i.next();
		i.remove();
		while(i.hasNext()){
			System.out.print(i.next());
		}
	}
}

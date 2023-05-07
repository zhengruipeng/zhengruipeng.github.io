package localhost;
import java.util.ArrayList;
import java.util.List; 
class I1A{
	void f(){System.out.print(123);}
}
public class index {
	
	static public void main(String[] args){
		ArrayList<I1A> b = new ArrayList<I1A>();
		for(int i=0;i<3;i++){
			b.add(new I1A());
		}
		for(int i=0;i<b.size();i++){
			((I1A)b.get(i)).f();
		}
	}
}

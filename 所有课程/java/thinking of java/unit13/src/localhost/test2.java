package localhost;
import java.util.*;
class t2A{
	public String toString(){
		return "t2A";
	}
}
public class test2 {
	public static void main(String[] args){
		ArrayList<t2A> arr = new ArrayList<t2A>();
		for(int i=0;i<4;i++){
			arr.add(new t2A());
		}
		ArrayList<String> s = new ArrayList<String>();
		for(int i=0;i<arr.size();i++){
			s.add(arr.get(i).toString());
		}
		System.out.print(s);
		
	}
}

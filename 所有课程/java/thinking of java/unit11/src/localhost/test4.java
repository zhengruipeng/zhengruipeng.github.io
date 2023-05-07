package localhost;
import java.util.*;
public class test4 {
	public class a{
		private ArrayList<String> arr = new ArrayList<String>();
		private int i =0;
		public String next(){
			return arr.get(i++);
		}
		a(String c){
			arr.add(c);
		}
		void add(String c){
			arr.add(c);
		}
		int length(){
			return arr.size();
		}
	}
	static public void main(String []args){
		a arr = new test4().new a("a");
		arr.add("312");
		arr.add("av");
		for(int i=0;i<arr.length();i++){
			System.out.print(arr.next());
		}
		
	}
}

package localhost;
import java.util.*;
public class test7 {
	class a{
		private ArrayList<String> arr;
		
		void init(){
			arr = new ArrayList<String>();
		}
		void fill(String s){
			for(int i=0;i<arr.size();i++)arr.set(i,s);
		}
		void delete(int i){
			arr.remove(i);
		}
		void print(){
			System.out.println(arr);
		}
		void add(String s){
			arr.add(s);
		}
		
	}
	static public void main(String []args){
		a arr = new test7().new a();
		arr.init();
		arr.add("123");
		arr.add("321");
		arr.print();
		arr.fill("3");
		arr.print();
		arr.delete(1);
		arr.print();
		}
}

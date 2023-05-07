package localhost;
import java.util.*;
public class test14 {
	class A{
		private LinkedList arr = new LinkedList();
		void add(String s){
			arr.add(s);
		}
		void insert(String s){
			arr.addFirst(s);
		}
		void del(int i){
			arr.remove(i);
		}
		void print(){
			System.out.print(arr);
		}
	}
	static public void main(String[] args){
		A arr = new test14().new A();
		arr.add("123");
		arr.insert("321");
		arr.print();
		
	}
}

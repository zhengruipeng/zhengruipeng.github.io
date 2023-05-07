package localhost;
import java.util.*;
public class test27 {
	class a{
		private String s = "123123";
		public String toString (){
			return this.s;
		}
	}
	class b{
		private Queue q = new LinkedList();
		
		void fill(){
			for(char s:new a().toString().toCharArray()){
				q.offer(s);
			}
		}
		 void print(){
			while(q.peek() != null){
				System.out.print(q.remove());
			}
		}
	}
	static public void main(String []args){
		b bb = new test27().new b();
		bb.fill();
		bb.print();
		
	}
}

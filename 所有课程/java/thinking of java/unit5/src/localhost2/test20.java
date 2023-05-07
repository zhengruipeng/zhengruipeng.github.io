package localhost2;

public class test20 {
	static private class A{
		static void print(String a[]){
			for(String s:a){
				System.out.print(s);
			}
		};
	}
	static public void main(String[] args){
		new A().print(new String []{"321","123"});
	}
}

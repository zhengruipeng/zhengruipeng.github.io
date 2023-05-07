package localhost;

public class test2 {
	static public class A{
		private String s= "234234";
		public String toString (){return s;};
	}
	static public void main(String []args){
		System.out.print(new A().toString());
	}
}

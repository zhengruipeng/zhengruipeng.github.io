package localhost;
public class test2 {
	static public void main(String[] args){
		class A{
			private String i = "123";
			protected void add(String s){i+=s;};
			protected void print(){System.out.print(i);}
		}
		class B extends A{
			
			public void add(int s){
				System.out.print("add");
				
				super.i += s;
			}
			B(){
				/*super.add("123");
				super.add("321");
				super.add("123");*/
				add(1);
				
				super.print();
			}
		}
		new B();
	}
}

package localhost;
public class test2 {
	static public void main(String[] args){
		class Con{
			void f(){
				System.out.print("123");
			}
		}
		Con c = new Con();
		c.f();
	}
}

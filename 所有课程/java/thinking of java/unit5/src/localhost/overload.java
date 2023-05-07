package localhost;

public class overload {
	static public void main(String[] args){
		class Tree{
			Tree(){
				System.out.print("no arg");
			}
			Tree(String s){
				System.out.print("arg:"+s);
			}
			void info(){
				System.out.println("info no arg");
			}
			void info(String s){
				System.out.println("info arg:"+s);
			}
			void info(int s){
				System.out.println("info arg123:"+s);
			}
		}
		Tree tree = new Tree();
		tree.info();
		Tree tree2 = new Tree("123");
		tree2.info();
		Tree tree3 = new Tree("123");
		tree3.info("123");
		tree3.info(321);
		Tree tree4 = new Tree();
		tree4.info("123");


	}
}

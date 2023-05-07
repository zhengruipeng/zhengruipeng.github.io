package localhost2;

public class test19 {
	static void a(String[] s){
		for(String a : s){
			System.out.print(a);
		}
	}
	static public void main(String []args){
		a(new String []{"123","321"});
	}
}

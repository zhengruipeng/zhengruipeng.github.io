package localhost;
public class test3 {
	static class Con{  
		Con(){
			System.out.println("123");
		}
		Con(String s){
			System.out.println("args:"+s);
		}
	}
	static public void main(String[] args){
		Con c = new Con();
		new Con("123");
	}
}


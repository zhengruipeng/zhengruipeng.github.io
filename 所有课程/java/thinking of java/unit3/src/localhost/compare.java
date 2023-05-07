package localhost;

public class compare {
	static public void main(String[] args){
		compare((short)1,(short)2);
	}
	static void compare(short x,short y){
		System.out.print(x>y?"大于":"小于");
	}
}

package localhost;
import java.util.Random;
import java.util.*;
import java.math.*;
public class round {
	static public double rand(){
		Random rand = new Random();
		double rand2 = Math.random();
		char r = (char)rand.nextInt();
		return rand2;
		
	}
	static public void main(String []args){
		System.out.print(rand());
	}
}

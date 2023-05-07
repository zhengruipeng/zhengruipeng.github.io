package localhost2;

import java.util.*;
public class change_args {
	static void print(Object... a){
		for(Object s : a){
			System.out.println(s);
		}
	}
	static void print2(int i,String[] s){
		System.out.println(i);
		System.out.print(Arrays.toString(s));
	}
	static void print3(){
		
	}
	static public void main(String[] args){
		print(new Boolean[]{true,false,true});
		print2(1,new String []{"1","2"});
	}
}

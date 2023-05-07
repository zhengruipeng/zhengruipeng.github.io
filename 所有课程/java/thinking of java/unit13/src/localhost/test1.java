package localhost;
import java.util.*;
public class test1 {
	public String toString (){
		System.out.format("321");
		return "test1";
	}
	public static void main(String []args){
		String s = "";
		for(int i=0;i<5;i++){
			s+=new test1();
		}
//		System.out.printf("%s",s);
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<5;i++){
			sb.append(new test1());
		}
		System.out.printf("%s",sb);

	}
}

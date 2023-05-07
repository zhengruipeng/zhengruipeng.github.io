package localhost;
import java.util.*;
import java.math.*;
public class test2 {
	static public int initRand(){
		double f = Math.random()*30;
		double i = Math.floor(f);
		int retval = (int)i;
		return retval;
		
	}
	static public int compare(int x,int y){
		if(x>y)return 1;
		else if(x<y)return -1;
		else return 0;
	}
	static public void main(String []args){
		for(int i=0;i<13;i++){
			int rand = initRand();
			for(int j=0;j<=1;j++){
				int rand2 = initRand();
				String retval;
				int judge = compare(rand,rand2);
				if(judge == 1)retval = "大于";
				else if(judge == -1)retval = "小于";
				else retval = "等于";
				System.out.println(retval);
				
			}
		}
	}
	
}

package localhost;
public class test3 {
	static public void main(String[] args){
		for(int i=1;i<=10;i++){
			double jedge = 1;
			for(int j=1;j<=10;j++){
				if(j == i|| j == 1){continue;}
				if(i%j == 0){jedge = 0;}
	
			}
			if(jedge == 1)System.out.print(i);
		}
	}
}

package localhost;

public class array {
	static public short initRand(){
		double f = Math.random()*30;
		double i = Math.floor(f);
		short retval = (short)i;
		return retval;
		
	}
	static public void main(String []args){
		short a[] = new short[10];
		for(short i=0;i<10;i++){
			a[i] = initRand();
			System.out.println(a[i]);
		}
		/*for(short x:a){
		}*/
		
		
	}
}

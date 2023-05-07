package localhost2;

public class test21 {
	public enum face{
		ONE,FIVE,TEN,TWENTY,FIFTY,HANDRED
	}
	static public void main(String []args){
		for(face f :face.values()){
			switch(f){
			case ONE:System.out.print(1);System.out.println(f.ordinal());break;
			case FIVE:System.out.print(5);System.out.println(f.ordinal());break;
			case TEN:System.out.print(10);System.out.println(f.ordinal());break;
			case TWENTY:System.out.print(20);System.out.println(f.ordinal());break;
			case FIFTY:System.out.print(50);System.out.println(f.ordinal());break;
			case HANDRED:System.out.print(100);System.out.println(f.ordinal());break;
			}
//			System.out.println(f);
		}
	}
}

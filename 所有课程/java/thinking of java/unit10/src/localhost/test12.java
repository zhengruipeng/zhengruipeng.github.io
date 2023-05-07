package localhost;
class D{
	
}
abstract class E{}
class Z extends D{
	E makeE(){return new E(){};}
}
public class test12 {
	static void takesD(D d){System.out.print(1);}
	static void takesE(E e){System.out.print(1);}
	public static void main(String []args){
		Z z = new Z();
		takesD(z);
		takesE(z.makeE());
	}
}

package localhost;
class ninA{
	ninA(){
		System.out.print("ninA");
	}
}
class ninB{
	ninB(){
		System.out.print("ninB");
	}
}
class ninC{
	ninC(){
		System.out.print("ninC");
	}
}
class ninD{
	ninD(){
		new ninA();
		new ninB();
		new ninC();
		System.out.print("ninD");
	}
}
class ninE extends ninD{
	ninE(){
		System.out.print("ninE");
	}
}

public class test9 {
	ninE e;
	ninD d;
	ninC c;
	ninB b;
	ninA a;
	static class delete{	
		delete(){
			System.out.println("ninE");
			System.out.print("ninD");
			System.out.print("ninC");
			System.out.print("ninB");
			System.out.print("ninA");
		}
	}
	static public void main(String []args){
		test9 nin = new test9();
		nin.e = new ninE();
		nin.d = new ninD();
		nin.c = new ninC();
		nin.b = new ninB();
		nin.a = new ninA();
		delete d = new delete();
		
		
	}
}

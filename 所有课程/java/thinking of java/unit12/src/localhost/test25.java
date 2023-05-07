public class test25{
	static class e1 extends Exception{
		
	};
	static class e2 extends e1{
		
	};
	static class a{
		void f() throws Exception{
			throw new Exception();
		}
	}
	static class b extends a{
		void f() throws e1{
			throw new e1();

		}
	}
	static class c extends b{
		void f() throws e2{
			throw new e2();
		}
	}
	static public void main (String []args){
		a c = new c();
		try{
			c.f();
		}catch(e2 e){
			System.out.print("2"+e.toString());
		}catch(e1 e){
			System.out.print("1"+e.toString());
		}catch(Exception e){
			System.out.print("0"+e.toString());
		}
	}
}